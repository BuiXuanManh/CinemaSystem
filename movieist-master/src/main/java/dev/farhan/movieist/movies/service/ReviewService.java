package dev.farhan.movieist.movies.service;

import dev.farhan.movieist.movies.model.Movie;
import dev.farhan.movieist.movies.repository.ReviewRepository;
import dev.farhan.movieist.movies.model.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository repository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Review createReview(String userName, String reviewBody, String imdbId) {
        Review review = repository.insert(new Review(userName, reviewBody, LocalDateTime.now(), LocalDateTime.now()));

        mongoTemplate.update(Movie.class)
            .matching(Criteria.where("imdbId").is(imdbId))
            .apply(new Update().push("reviews").value(review))
            .first();

        return review;
    }
}
