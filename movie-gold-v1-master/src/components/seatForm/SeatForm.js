import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import api from '../../api/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';
import Header, { userCurrentId } from '../header/Header';
import Modal from "react-bootstrap/Modal";
import Cookies from 'js-cookie';
const SeatForm = ({ loginData, orderedSeat, setOrderedSeats, setTotalPrice, getMovieData, seats, setSeats }) => {

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  const OrderedSeat = useRef(null);
  const [tongGia, setTongGia] = useState(0);
  const params = useParams();
  const movieId = params.movieId;
  const navigate = useNavigate();
  useEffect(() => {
    getMovieData(movieId);
    console.log(seats);
  }, []);
  const updateSeats = () => {
    try {
      setOrderedSeats(() => {
        return seats.map((seat) => {
          if (seat?.status === 'OrderedSeat') {
            return seat.seatName;
          }
          return undefined;
        }).filter(Boolean);
      });
      console.log(orderedSeat);

      api.post(`/api/v1/movies/update/${movieId}/${Cookies.get('user_name')}`, orderedSeat).then(() => {
        setTotalPrice(tongGia);
        console.log(orderedSeat);
        console.log(seats);
        alert("thanh toan");
      });
    } catch (error) {
      console.error(error);
    }
  };
  function pay(movieId) {
    if (Cookies.get('user_name') === null)
      return;
    else {
      setShowModal(true);
    }
    console.log(orderedSeat);
    console.log(seats);
    setSeats(seats)
    updateSeats();
    navigate(`/pay/${movieId}`);
  }

  const updateStatusSeat = async (seatName, xo) => {
    try {
      if (xo === '' || xo == null) {
        setSeats((prevSeats) => {
          return prevSeats.map((seat) => {
            if (seat?.seatName === seatName) {
              return { ...seat, status: 'OrderedSeat' };
            }
            return seat;
          });
        });
      } else if (xo === '/cancel') {
        setSeats((prevSeats) => {
          return prevSeats.map((seat) => {
            if (seat?.seatName === seatName) {
              return { ...seat, status: 'Seat' };
            }
            return seat;
          });
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const datCho = (seatName) => {
    OrderedSeat.current = seats.find((seat) => seat?.seatName === seatName);
    let xo = '';
    if (OrderedSeat.current?.status === 'OrderedSeat') {
      xo = '/cancel';
    }
    updateStatusSeat(seatName, xo);
  };

  useEffect(() => {
    setOrderedSeats(() => {
      return seats.map((seat) => {
        if (seat?.status === 'OrderedSeat') {
          return seat.seatName;
        }
        return undefined;
      }).filter(Boolean);
    });
    tinhTongGia();

  }, [seats]);

  const tinhTongGia = () => {
    let tongGiaMoi = 0;
    seats?.forEach((seat) => {
      if (seat.status === 'OrderedSeat') {
        if (seat.style === 'vipSeat') {
          tongGiaMoi += 60000;
        } else {
          tongGiaMoi += 50000;
        }
      }
    });
    setTongGia(tongGiaMoi);
  };

  const huyCho = (seatName) => {
    OrderedSeat.current = seats.find((seat) => seat?.seatName === seatName);
    if (OrderedSeat.current?.seatName) {
      updateStatusSeat(seatName, '/cancel');
    }
  };

  const renderGhe = () => {
    const sortedSeats = seats.slice().sort((a, b) => {
      const seatA = a.seatName;
      const seatB = b.seatName;
      const rowA = seatA.charCodeAt(0);
      const rowB = seatB.charCodeAt(0);
      const colA = Number(seatA.slice(1));
      const colB = Number(seatB.slice(1));

      if (rowA === rowB) {
        return colA - colB;
      }

      return rowA - rowB;
    });

    const rows = [];
    let currentRow = [];
    let currentRowNumber = -1;

    sortedSeats.forEach((seat) => {
      const row = seat.seatName.charCodeAt(0);

      if (currentRowNumber !== row) {
        if (currentRow.length > 0) {
          rows.push(currentRow);
        }
        currentRow = [seat];
        currentRowNumber = row;
      } else {
        currentRow.push(seat);
      }
    });

    // Push the last row
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    const gheJSX = rows.map((row, rowIndex) => (
      <Row key={`row-${rowIndex}`} className="justify-content-center mb-3">
        {row.map((seat) => {
          let gheClassName = 'seat';
          let gheVariant = 'light';
          switch (seat.status) {
            case 'OrderedSeat':
              gheClassName = 'OrderedSeat';
              gheVariant = 'success';
              break;
            case 'lockedSeat':
              gheClassName = 'lockedSeat';
              gheVariant = 'secondary';
              break;
            default:
              // Nếu không thuộc các trạng thái trên thì tiếp tục kiểm tra trạng thái style
              if (seat.style === 'vipSeat') {
                gheClassName = 'vipSeat';
                gheVariant = 'danger';
              }
              // Các trạng thái khác (nếu có) sẽ giữ nguyên mặc định là 'seat' và 'light'
              break;
          }

          return (
            <Col key={seat.seatName} className={gheClassName} xs={1}>
              <Button
                variant={gheVariant}
                onClick={() => datCho(seat.seatName)}
                onDoubleClick={() => huyCho(seat.seatName)}
                disabled={gheClassName.includes('lockedSeat')}
              >
                {seat.seatName}
              </Button>
            </Col>
          );
        })}
      </Row>
    ));

    return <>{gheJSX}</>;
  };



  return (
    <Container className="giao-dien-dat-cho">
      <Row className="justify-content-center mt-3 mb-3">
        <Col>
          <h2 className="text-center mt-3">SEATS ORDER</h2>
        </Col>
      </Row>

      {renderGhe()}
      <Row className="justify-content-center mt-3">
        <Col>
          <hr></hr>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col className="col-md-9">
          <Button className="btn btn-success mt-3" onClick={() => pay(movieId)} style={{ width: '100%' }}>
            Thanh toán
          </Button>
        </Col>
      </Row>
      <Row className="mt-3">
        <Button className="col-md-1" variant="light" disabled />
        <span className="col-md-3 ml-1">Ghế trống</span>
        <span className="col-md-1 ml-1">Giá:</span>
        <span className="col-md-1">50000</span>
      </Row>
      <Row className="mt-3">
        <Button className="col-md-1" variant="success" disabled />
        <span className="col-md-3 ml-1">Ghế chọn</span>
        <span className="col-md-1 ml-1">Tổng giá:</span>
        <span className="col-md-1">{tongGia}</span>
      </Row>
      <Row className="mt-3">
        <Button className="col-md-1" variant="danger" disabled />
        <span className="col-md-3 ml-1">Ghế VIP</span>
        <span className="col-md-1 ml-1">Giá:</span>
        <span className="col-md-1">60000</span>
      </Row>
      <Row className="mt-3">
        <Button className="col-md-1" variant="secondary" disabled />
        <span className="col-md-3 ml-1">Ghế đã khóa</span>
      </Row>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Body>
          <div className="mb-3" style={{ textAlign: "center" }}>
            <label htmlFor="notify" className="form-label" style={{ fontSize: "30px" }}>You must log in to continue</label>
          </div>
        </Modal.Body>
        <Modal.Footer id="LFooter">
          <Button variant="danger" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SeatForm;
