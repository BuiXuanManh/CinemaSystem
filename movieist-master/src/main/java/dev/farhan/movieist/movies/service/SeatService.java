package dev.farhan.movieist.movies.service;

import dev.farhan.movieist.movies.model.Movie;
import dev.farhan.movieist.movies.model.Seat;
import dev.farhan.movieist.movies.repository.SeatRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SeatService {
    @Autowired
    private SeatRepository repository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Seat createSeat(Seat seat, String imdbId) {
        Seat a = new Seat(seat.getSeatName(), LocalDateTime.now(), LocalDateTime.now(), seat.getStyle(), seat.getPrice(), seat.getStatus());
        Seat s = repository.insert(a);
        mongoTemplate.update(Movie.class)
                .matching(Criteria.where("imdbId").is(imdbId))
                .apply(new Update().push("seats").value(s))
                .first();
        return s;
    }

    public Optional<Seat> find(ObjectId id) {
        Optional<Seat> s = repository.findById(id);
        return s;
    }

    public List<Seat> findBySeatName(String seatName) {
        List<Seat> s = repository.findBySeatName(seatName);
        return s;
    }

    public void deleteId(ObjectId id) {
        repository.deleteById(id);
    }
}
