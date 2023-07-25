import React,{useRef} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate,useParams } from 'react-router-dom';

const Pay = ({  totalPrice, seats, setSeats }) => {
  const navigate = useNavigate();
  const OrderedSeat = useRef(null);
  let params = useParams();
  const movieId = params.movieId;
  // Thêm hàm xử lý khi người dùng bấm nút thanh toán
  const handlePayment = () => {
    // Xử lý logic thanh toán ở đây, ví dụ gửi yêu cầu thanh toán đến server, cập nhật trạng thái ghế đã đặt, v.v.
    // Sau khi xử lý thành công, có thể chuyển hướng người dùng đến trang hoàn tất thanh toán
    navigate(`/pay/${movieId}/payment-complete`);
  };

  return (
    <Container className="giao-dien-thanh-toan">
      <Row className="justify-content-center mt-3 mb-3">
        <Col>
          <h2 className="text-center mt-3">THANH TOÁN</h2>
        </Col>
      </Row>
      {/* Hiển thị thông tin về các ghế đã chọn và tổng giá thanh toán */}
      {/* Có thể sử dụng `seats` và `tongGia` để hiển thị thông tin chi tiết */}
      {/* Ví dụ: */}
      <Row className="mt-3">
      <Col>
        <p>Ghế đã chọn:</p>
        {seats?.map((seat) => (
          // Kiểm tra trạng thái của ghế là "OrderedSeat" hay không
          seat.status === 'OrderedSeat' && (
            <>
                <Col>{seat?.seatName}</Col>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          )
        ))}
      </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <p>Tổng giá:</p>
          <p>{totalPrice}</p>
        </Col>
      </Row>
      {/* Nút thanh toán */}
      <Row className="justify-content-center mt-3">
        <Col className="col-md-9">
          <Button className="btn btn-success mt-3" onClick={handlePayment} style={{ width: '100%' }}>
            Thanh toán
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Pay;
