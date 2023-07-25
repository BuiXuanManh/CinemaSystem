package dev.farhan.movieist.movies.controller;

import dev.farhan.movieist.movies.model.Movie;
import dev.farhan.movieist.movies.model.Review;
import dev.farhan.movieist.movies.model.Seat;
import dev.farhan.movieist.movies.service.MovieService;
import dev.farhan.movieist.movies.service.ReviewService;
import dev.farhan.movieist.movies.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/views/seats")
public class SeatController {
    @Autowired
    private SeatService service;
    @Autowired
    private MovieService movieService;

    @PostMapping()
    public ResponseEntity<Seat> createReview(@RequestBody Map<String, String> payload) {
        return new ResponseEntity<Seat>(service.createSeat(payload.get("style"),payload.get("status"),payload.get("seatName"), payload.get("imdbId")), HttpStatus.OK);
    }
}

