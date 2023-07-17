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
@Service
public class SeatService {
    @Autowired
    private SeatRepository repository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Seat createReview(String reviewBody, String imdbId) {
        Seat s = repository.insert(new Seat(reviewBody, LocalDateTime.now(), LocalDateTime.now(),"normalSeat",50000.0,"seat"));

        mongoTemplate.update(Movie.class)
                .matching(Criteria.where("imdbId").is(imdbId))
                .apply(new Update().push("seats").value(s))
                .first();

        return s;
    }
}
