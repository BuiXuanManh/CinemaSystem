package dev.farhan.movieist.movies.service;

import dev.farhan.movieist.movies.model.Movie;
import dev.farhan.movieist.movies.model.Seat;
import dev.farhan.movieist.movies.model.User;
import dev.farhan.movieist.movies.repository.MovieRepository;
import dev.farhan.movieist.movies.repository.SeatRepository;
import dev.farhan.movieist.movies.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MovieService {
    @Autowired
    private MovieRepository repository;
    @Autowired
    private SeatRepository SeatRepository;
    @Autowired
    private UserRepository userRepository;
    public List<Movie> findAllMovies() {
        return repository.findAll();
    }

    public Optional<Movie> findMovieByImdbId(String imdbId) {
        return repository.findMovieByImdbId(imdbId);
    }

    public Movie save(Movie movie) {
        return repository.save(movie);
    }
    public Movie updateSeats(List<String> updatedSeats, String imdbId, User us) {
        Optional<Movie> optionalMovie = repository.findMovieByImdbId(imdbId);
        if (optionalMovie.isPresent()) {
            Movie movie = optionalMovie.get();
            List<Seat> movieSeats = movie.getSeats();
            List<Seat> orderedSeats = us.getOrderedSeat();
            for (Seat s : movieSeats) {
                for (String updatedSeatName : updatedSeats) {
                    if (s.getSeatName().equalsIgnoreCase(updatedSeatName)) {
                        String status = s.getStatus();
                        if (status.equals("seat")) {
                            s.setMoviesId(imdbId);
                            s.setStatus("OrderedSeat");
                            s.setUpdated(LocalDateTime.now());
                            SeatRepository.save(s);
                        } else if (status.equals("OrderedSeat")) {
                            s.setMoviesId(movie.getTitle());
                            s.setStatus("lockedSeat");
                            s.setUpdated(LocalDateTime.now());
                            orderedSeats.add(s);
                            System.out.println(s);
                            SeatRepository.save(s);
                        }
                    }
                }
            }
            us.setOrderedSeat(orderedSeats);
            Movie updatedMovie = repository.save(movie);
            userRepository.save(us);
            return updatedMovie;
        } else {
            return null;
        }
    }

}
