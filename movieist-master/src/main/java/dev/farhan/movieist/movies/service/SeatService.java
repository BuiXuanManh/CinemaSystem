package dev.farhan.movieist.movies.service;

import dev.farhan.movieist.movies.model.Movie;
import dev.farhan.movieist.movies.model.Review;
import dev.farhan.movieist.movies.model.Seat;
import dev.farhan.movieist.movies.repository.ReviewRepository;
import dev.farhan.movieist.movies.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class SeatService {
    @Autowired
    private SeatRepository repository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Seat createSeat(String seatStyle,String seatStatus ,String seatName, String imdbId) {
        Double g=0.0;
        if(seatStyle!=null){
        if(seatStyle.equalsIgnoreCase("normalSeat"))
            g=50000.0;
        else if (seatStyle.equalsIgnoreCase("vipSeat"))
            g=60000.0;}
        Seat s = repository.insert(new Seat(seatName, LocalDateTime.now(), LocalDateTime.now(),seatStyle,g,seatStatus));

        mongoTemplate.update(Movie.class)
                .matching(Criteria.where("imdbId").is(imdbId))
                .apply(new Update().push("seats").value(s))
                .first();

        return s;
    }
    public Optional<Seat> findMovieBySeatName(String seatName) {
        return repository.findMovieBySeatName(seatName);
    }
}
