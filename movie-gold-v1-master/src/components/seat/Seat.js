import "./Seat.css";
import {Container, Row, Col} from 'react-bootstrap';
// Số lượng ghế và trạng thái khóa
const numSeats = 20;
const lockedSeats = [3, 7, 12]; // Các ghế đã khóa

const seatMap = document.getElementById("seatMap");
const Seat=()=>{
    for (let i = 1; i <= numSeats; i++) {
        const seat = document.createElement("div");
        seat.classList.add("seat");
    
        // Kiểm tra trạng thái ghế và thêm lớp tương ứng
        if (lockedSeats.includes(i)) {
            seat.classList.add("locked");
        }
    
        // Xử lý sự kiện khi nhấn vào ghế
        seat.addEventListener("click", function () {
            if (!seat.classList.contains("locked")) {
                seat.classList.toggle("selected");
            }
        });
    
        // Thêm ghế vào bản đồ ghế
        seatMap.appendChild(seat);
    }
    return(
    <Container>
        <Row>Đặt vé</Row>
        <Row>Hãy chọn ghế:</Row>
    
        <Row id="seatMap">
            
        </Row>
    </Container>)
}
// Tạo các ghế
export default Seat;
