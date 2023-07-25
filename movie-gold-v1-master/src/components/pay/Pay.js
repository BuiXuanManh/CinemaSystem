import React,{useRef} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate,useParams } from 'react-router-dom';
import api from '../../api/axiosConfig';

const Pay = ({  totalPrice, seats, loginData }) => {
  const navigate = useNavigate();
  const OrderedSeat = useRef(null);
  let params = useParams();
  const movieId = params.movieId;
  api
                  .post(`/api/v1/movies/${movieId}`,seats)
                  .then((response) => {;
                    alert("successful");
                  })
  const handlePayment = () => {
    {console.log(seats)}
    alert("thanh toan thanh cong");
    navigate(`/views/seats/${movieId}`)
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
