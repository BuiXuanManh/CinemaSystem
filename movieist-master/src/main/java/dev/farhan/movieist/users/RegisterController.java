package dev.farhan.movieist.users;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class RegisterController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        boolean registrationStatus = userService.createUser(user);

        if (registrationStatus) {
            return ResponseEntity.ok("Đăng kí thành công!");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Người dùng đã tồn tại!");
        }
    }

}
