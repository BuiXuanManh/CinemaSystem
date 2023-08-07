package dev.farhan.movieist.movies.service;


import dev.farhan.movieist.movies.model.Movie;
import dev.farhan.movieist.movies.model.Review;
import dev.farhan.movieist.movies.model.Seat;
import dev.farhan.movieist.movies.model.User;
import dev.farhan.movieist.movies.repository.ReviewRepository;
import dev.farhan.movieist.movies.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;
    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("username not found"));
    }

    public User findById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("user id not found"));
    }
    public User findByUserName(String name){
        return userRepository.findByUsername(name)
                .orElseThrow(() -> new UsernameNotFoundException("user name not found"));
    }
    public User saveUser(User user){
        return userRepository.save(user);
    }

}
