package dev.farhan.movieist.movies.controller;

import dev.farhan.movieist.movies.model.Review;
import dev.farhan.movieist.movies.model.Seat;
import dev.farhan.movieist.movies.service.ReviewService;
import dev.farhan.movieist.movies.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
@RestController
@RequestMapping("/api/v1/views/seats")
public class SeatController {
    @Autowired
    private SeatService service;

    @PostMapping()
    public ResponseEntity<Seat> createReview(@RequestBody Map<String, String> payload) {

        return new ResponseEntity<Seat>(service.createReview(payload.get("seatBody"), payload.get("imdbId")), HttpStatus.OK);
    }
}

