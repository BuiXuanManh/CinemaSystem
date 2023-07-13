package dev.farhan.movieist.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository
        extends MongoRepository<User, String> {


    User findByUsername(String username);
    boolean existsByUsername(String username);
}
