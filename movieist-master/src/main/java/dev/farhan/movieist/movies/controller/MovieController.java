package dev.farhan.movieist.movies.controller;

import dev.farhan.movieist.movies.model.Movie;
import dev.farhan.movieist.movies.model.Seat;
import dev.farhan.movieist.movies.model.User;
import dev.farhan.movieist.movies.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/movies")
public class MovieController {

    @Autowired
    private MovieService service;

    @GetMapping
    public ResponseEntity<List<Movie>> getMovies() {
        return new ResponseEntity<List<Movie>>(service.findAllMovies(), HttpStatus.OK);
    }

    @GetMapping("/{imdbId}")
    public ResponseEntity<Optional<Movie>> getSingleMovie(@PathVariable String imdbId){
        return new ResponseEntity<Optional<Movie>>(service.findMovieByImdbId(imdbId), HttpStatus.OK);
    }
//    @PostMapping("/{imdbId}")
//    public ResponseEntity<User> updateSeats(@RequestBody List<Seat> updatedSeats,@PathVariable String imdbId) {
//        User updatedSeatList = service.updateSeats( updatedSeats,imdbId);
//        return new ResponseEntity<>(updatedSeatList, HttpStatus.OK);
//    }
    @PostMapping("/{imdbId}")
    public Movie createReview(@RequestBody List<Seat> seatsBody, @PathVariable String imdbId) {
//        for (Seat seat : seatsBody) {
//            System.out.println(seat);
//        }
        return new ResponseEntity<Movie>(service.updateSeats(seatsBody,imdbId), HttpStatus.OK).getBody();
    }
}
