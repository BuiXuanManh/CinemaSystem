package dev.farhan.movieist.movies.controller;

import dev.farhan.movieist.movies.model.Movie;
import dev.farhan.movieist.movies.model.Seat;
import dev.farhan.movieist.movies.model.User;
import dev.farhan.movieist.movies.service.MovieService;
import dev.farhan.movieist.movies.service.SeatService;
import dev.farhan.movieist.movies.service.UserService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import io.github.resilience4j.retry.annotation.Retry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/movies")
public class MovieController {

    @Autowired
    private MovieService service;
    @Autowired
    private SeatService seatService;
    @Autowired
    private UserService userService;

//    @CircuitBreaker(name = "movieService", fallbackMethod = "fallbackGetMovies")
    @GetMapping
    public ResponseEntity<List<Movie>> getMovies() {
        return new ResponseEntity<List<Movie>>(service.findAllMovies(), HttpStatus.OK);
    }

//    @CircuitBreaker(name = "movieService", fallbackMethod = "fallbackGetSingleMovie")
    @GetMapping("/{imdbId}")
//    @Retry(name = "movieService", fallbackMethod = "fallbackGetSingleMovie")
//    @RateLimiter(name = "movieService", fallbackMethod = "fallbackGetSingleMovie")
    public ResponseEntity<Movie> getSingleMovie(@PathVariable String imdbId) {
        Optional<Movie> m = service.findMovieByImdbId(imdbId);
        Movie n = new Movie();
        if (m.isPresent()) {
            n = m.get();
            List<Seat> l = n.getSeats();
            int o = 0;
            for (Seat s : l) {
                if (s.getStatus().equalsIgnoreCase("lockedSeat")) {
                    o++;
                }
            }
            n.setSeatOrdered(o);
            n.setSeatMax(l.size());
        }
        if (n.getImdbId() != null)
            service.save(n);
        return new ResponseEntity<Movie>(n, HttpStatus.OK);
    }

//    @CircuitBreaker(name = "movieService", fallbackMethod = "fallbackUpdateSeat")
    @PostMapping("/update/{imdbId}/{username}")
    public ResponseEntity<Movie> updateSeat(@RequestBody List<String> seatNames, @PathVariable("imdbId") String imdbId, @PathVariable("username") String username) throws Exception {
        User u = userService.findByUserName(username);
        if (seatNames != null) {
            ResponseEntity<Movie> a = service.updateSeats(seatNames, imdbId, u);
            return a;
        }
        return null;
    }
    @PostMapping("/update2/{imdbId}/{username}")
    public ResponseEntity<Movie> updateSeat2(@RequestBody List<String> seatNames, @PathVariable("imdbId") String imdbId, @PathVariable("username") String username) throws Exception {
        User u = userService.findByUserName(username);
        if (seatNames != null) {
            ResponseEntity<Movie> a = service.updateSeats2(seatNames, imdbId, u);
            return a;
        }
        return null;
    }

//    @CircuitBreaker(name = "movieService", fallbackMethod = "fallbackInserSeat")
    @PostMapping("/insert/{imdbId}")
    public Movie inserSeat(@RequestBody List<Seat> seat, @PathVariable String imdbId) {
        Movie m = service.findMovieByImdbId(imdbId).orElse(null);
        List<Seat> l = new ArrayList<>();
        for (Seat s : seat) {
            Seat a = seatService.createSeat(s, imdbId);
            l.add(a);
        }
        m.setSeats(l);
        service.save(m);
        return m;
    }

//    @CircuitBreaker(name = "movieService", fallbackMethod = "fallbackFind")
    @GetMapping("/seat/{imdbId}")
    public List<Seat> find(@PathVariable("imdbId") String imdbId) {
        Movie m = service.findMovieByImdbId(imdbId).get();
        List<Seat> s = m.getSeats();
        List<Seat> a = new ArrayList<>();
        for (Seat seat : s) {
            if (seat.getSeatName().equalsIgnoreCase("F5")) {
                System.out.println(seat);
                a.add(seat);
            }
        }
        return a;
    }

    // ...

    // Các phương thức fallback cho mỗi phương thức được bao quanh bằng @CircuitBreaker
    // Nếu có lỗi trong phương thức gốc, fallback method sẽ được gọi để xử lý lỗi.

    private ResponseEntity<List<Movie>> fallbackGetMovies(Exception e) {
        // Xử lý lỗi nếu cần thiết
        return new ResponseEntity<List<Movie>>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<Movie> fallbackGetSingleMovie(String imdbId, Exception e) {
        return new ResponseEntity<Movie>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private void fallbackUpdateSeat(List<String> seatNames, String imdbId, String username, Throwable t) {
        // Xử lý lỗi nếu cần thiết
    }

    private Movie fallbackInserSeat(List<Seat> seat, String imdbId, Throwable t) {
        // Xử lý lỗi nếu cần thiết
        return null;
    }

    private List<Seat> fallbackFind(String imdbId, Throwable t) {
        // Xử lý lỗi nếu cần thiết
        return new ArrayList<>();
    }

}
