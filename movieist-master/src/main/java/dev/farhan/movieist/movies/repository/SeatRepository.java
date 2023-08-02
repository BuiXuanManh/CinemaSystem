package dev.farhan.movieist.movies.repository;

import dev.farhan.movieist.movies.model.Movie;
import dev.farhan.movieist.movies.model.Seat;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface SeatRepository extends MongoRepository<Seat, ObjectId> {
    List<Seat> findBySeatName(String seatName);
}
