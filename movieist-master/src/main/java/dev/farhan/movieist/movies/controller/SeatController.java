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
    @PostMapping("/{imdbId}/{seatName}")
    public ResponseEntity<Seat> updateSeat(@PathVariable("imdbId") String imdbId, @PathVariable("seatName") String seatName) {
        Optional<Movie> movieOptional = movieService.findMovieByImdbId(imdbId);

        if (movieOptional.isPresent()) {
            Movie movie = movieOptional.get();
            List<Seat> seats = movie.getSeats();

            // Tìm kiếm seat theo seatName
            Optional<Seat> seatOptional = seats.stream()
                    .filter(seat -> seat.getSeatName().equals(seatName))
                    .findFirst();

            if (seatOptional.isPresent()) {
                Seat seat = seatOptional.get();

                seat.setStatus("OrderedSeat");
                movieService.save(movie);

                return new ResponseEntity<>(seat, HttpStatus.OK);
            }
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @PostMapping("/{imdbId}/{seatName}/cancel")
    public ResponseEntity<Seat> cancelSeat(@PathVariable("imdbId") String imdbId, @PathVariable("seatName") String seatName) {
        Optional<Movie> movieOptional = movieService.findMovieByImdbId(imdbId);

        if (movieOptional.isPresent()) {
            Movie movie = movieOptional.get();
            List<Seat> seats = movie.getSeats();

            // Tìm kiếm seat theo seatName
            Optional<Seat> seatOptional = seats.stream()
                    .filter(seat -> seat.getSeatName().equals(seatName))
                    .findFirst();

            if (seatOptional.isPresent()) {
                Seat seat = seatOptional.get();

                seat.setStatus("Seat");
                movieService.save(movie);

                return new ResponseEntity<>(seat, HttpStatus.OK);
            }
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

