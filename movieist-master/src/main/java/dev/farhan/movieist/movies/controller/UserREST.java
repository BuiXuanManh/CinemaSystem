package dev.farhan.movieist.movies.controller;


import dev.farhan.movieist.movies.model.Review;
import dev.farhan.movieist.movies.model.Seat;
import dev.farhan.movieist.movies.model.User;
import dev.farhan.movieist.movies.repository.UserRepository;
import dev.farhan.movieist.movies.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
//    @PreAuthorize("#user.id == #id")
    public ResponseEntity<?> me(@AuthenticationPrincipal User user, @PathVariable String id) {
        return ResponseEntity.ok(userRepository.findById(id));
    }
//    @PostMapping("/momo/payment")
//    public ResponseEntity<?> processPayment(
//            @AuthenticationPrincipal User user,
//            @RequestBody Map<String, Object> paymentInfo
//    ) {
//        try {
//            // Lấy thông tin từ client gửi lên
//            List<Seat> orderedSeat = (List<Seat>) paymentInfo.get("orderedSeat");
//            double totalPrice = (double) paymentInfo.get("totalPrice");
//            String username = user.getUsername(); // Lấy tên đăng nhập của người dùng đã đăng nhập
//
//            // Thực hiện xử lý thanh toán qua Momo ở đây
//            // Gửi thông tin ghế đã chọn và tổng giá thanh toán lên Momo để thực hiện thanh toán
//            // Sau khi thanh toán thành công, bạn có thể cập nhật trạng thái các ghế đã chọn vào cơ sở dữ liệu,
//            // ví dụ: set trạng thái của các ghế đã chọn là "Đã đặt" trong cơ sở dữ liệu.
//
//            // ... (Viết đoạn mã xử lý thanh toán qua Momo ở đây)
//
//            // Trả về kết quả thành công nếu thanh toán thành công
//            return ResponseEntity.ok("Thanh toán thành công qua Momo!");
//        } catch (Exception e) {
//            e.printStackTrace();
//            // Xử lý khi có lỗi trong quá trình thanh toán
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra trong quá trình thanh toán qua Momo. Vui lòng thử lại sau!");
//        }
//    }
    @GetMapping("/user/{username}")
    public ResponseEntity<User> getUser(@PathVariable String username) {
        User a = service.findByUserName(username);
        System.out.println(a);
        return new ResponseEntity<User>(a, HttpStatus.OK);
    }
}
