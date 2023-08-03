import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axiosConfig';
import Cookies from 'js-cookie';
// Các import đã import giữ nguyên

const Pay = ({ loginData, getMovieData, orderedSeat, totalPrice }) => {
  const navigate = useNavigate();
  let params = useParams();
  const movieId = params.movieId;
  // const [qrCode, setQrCode] = useState('');
  const updateSeats = () => {
    console.log(orderedSeat);
    api.post(`/api/v1/movies/update2/${movieId}/${Cookies.get('user_name')}`, orderedSeat).then(() => {
      alert("thanh toan thanh cong");
      navigate(`/views/seats/${movieId}`);
      // getMovieData(movieId);
    });
  };
  const handlePayment = () => {
    if (Cookies.get('user_name') === null)
      return
    updateSeats();
  };
  useEffect(() => {
    getMovieData(movieId);
  }, []);
  const handlePaymentMomo = () => {
    // Kiểm tra nếu người dùng chưa đăng nhập thì không cho thanh toán
    if (Cookies.get('user_name') === null) {
      alert("not login")
      return;
    }

    // Ở đây bạn sẽ thực hiện các bước xử lý thanh toán qua Momo
    // Đoạn mã sẽ gọi API hoặc xử lý thông tin thanh toán, ví dụ:
    // Gửi thông tin ghế đã chọn và tổng giá thanh toán lên server
    api
      .post(`/api/v1/momo/payment`, {
        orderedSeat: orderedSeat,
        totalPrice: totalPrice,
        username: Cookies.get('user_name'),
      })
      .then((response) => {
        // Xử lý kết quả trả về từ server sau khi thanh toán qua Momo thành công
        console.log(response.data); // Hiển thị kết quả từ server (tuỳ theo server trả về)
        alert("Thanh toán thành công qua Momo!");
        navigate('/'); // Sau khi thanh toán thành công, điều hướng về trang chủ (hoặc trang cần điều hướng)
      })
      .catch((error) => {
        // Xử lý khi có lỗi trong quá trình thanh toán
        console.error(error);
        alert("Có lỗi xảy ra trong quá trình thanh toán qua Momo. Vui lòng thử lại sau!");
      });
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
          {orderedSeat?.map((seat) => (
            // Kiểm tra trạng thái của ghế là "OrderedSeat" hay không
            (
              <>
                <Col>{seat}</Col>

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
