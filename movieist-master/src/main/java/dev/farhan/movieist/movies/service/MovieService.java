package dev.farhan.movieist.movies.service;

import dev.farhan.movieist.movies.model.Movie;
import dev.farhan.movieist.movies.model.Seat;
import dev.farhan.movieist.movies.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository repository;

    public List<Movie> findAllMovies() {
        return repository.findAll();
    }

    public Optional<Movie> findMovieByImdbId(String imdbId) {
        return repository.findMovieByImdbId(imdbId);
    }

    public Movie save(Movie movie) {
        return repository.save(movie);
    }

    public List<Seat> updateSeats( List<Seat> updatedSeats,String imdbId) {
        // Lấy thông tin phim từ cơ sở dữ liệu
        Optional<Movie> movieOptional = repository.findMovieByImdbId(imdbId);
        if (movieOptional.isEmpty()||updatedSeats.isEmpty()) {
            return null;
        }

        // Lấy đối tượng Movie từ Optional và cập nhật danh sách ghế
        Movie movie = movieOptional.get();
        movie.setSeats(updatedSeats);

        // Lưu lại thông tin phim đã cập nhật
        Movie updatedMovie = repository.save(movie);

        return updatedMovie.getSeats();
    }

}
