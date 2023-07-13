package dev.farhan.movieist.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public Boolean createUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            return false;
        }
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(user.getPassword());

        User userNew = new User(user.getUsername(), encodedPassword);
        userRepository.save(userNew);

        return true;
    }


}