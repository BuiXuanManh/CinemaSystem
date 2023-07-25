package dev.farhan.movieist.movies.controller;


import dev.farhan.movieist.movies.model.Review;
import dev.farhan.movieist.movies.model.User;
import dev.farhan.movieist.movies.repository.UserRepository;
import dev.farhan.movieist.movies.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserREST {
    @Autowired
    UserRepository userRepository;
    @Autowired
    private UserService service;

    @GetMapping("/me")
    public ResponseEntity<?> me(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(user);
    }

    @GetMapping("/{id}")
    @PreAuthorize("#user.id == #id")
    public ResponseEntity<?> me(@AuthenticationPrincipal User user, @PathVariable String id) {
        return ResponseEntity.ok(userRepository.findById(id));
    }
//    @PostMapping("/{username}")
//    @PreAuthorize("#user.id == #id")
//    public ResponseEntity<User> createReview(@RequestBody Map<String, String> payload) {
//        return new ResponseEntity<User>(service.addMovies(payload.get("moviesBody"), payload.get("username"),payload.get("imdbId")), HttpStatus.OK);
//    }
}
