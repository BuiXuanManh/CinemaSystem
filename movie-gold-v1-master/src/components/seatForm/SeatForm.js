import './SeatForm.css';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';

const SeatForm = ({ getMovieData, movie, seats, setSeats }) => {
  const OrderedName = useRef(null);
  const OrderedSeat = useRef(null);
  const [tongGia, setTongGia] = useState(0);
  const params = useParams();
  const movieId = params.movieId;

  useEffect(() => {
    getMovieData(movieId);
  }, []);
  console.log(seats)
  const updateStatusSeat = async (seatName, xo) => {
    try {
      if (xo === "" || xo == null) {
        setSeats(prevSeats => {
          return prevSeats.map(seat => {
            if (seat?.seatName === seatName) {
              return { ...seat, status: "OrderedSeat" };
            }
            return seat;
          });
        });
      } else if (xo === "/cancel") {
        setSeats(prevSeats => {
          return prevSeats.map(seat => {
            if (seat?.seatName === seatName) {
              
                return { ...seat, status: "Seat" };
              
            }
            return seat;
          });
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const datCho = (hang, cot) => {
    const gheId = `${String.fromCharCode(65 + hang - 1)}${cot}`;
    seats?.map(seat => {
      if (seat?.seatName === gheId) {
        OrderedSeat.current = seat;
      }
      return seat;
    });

    let xo = "";
    if (OrderedSeat.current?.status === "OrderedSeat") {
      xo = "/cancel";
      updateStatusSeat(OrderedSeat.current?.seatName, xo);
    } else {
      updateStatusSeat(OrderedSeat.current?.seatName, xo);
      
    }
  };

  useEffect(() => {
    tinhTongGia();
  }, [seats]);

  const tinhTongGia = () => {
    let tongGiaMoi = 0;
    seats?.map(seat => {
      if (seat.status === 'OrderedSeat') {
        if (
          seat.style === 'vipSeat'
        ) {
          tongGiaMoi += 60000;
        } else {
          tongGiaMoi += 50000;
        }
      }
    })

    setTongGia(tongGiaMoi);
  };

  const huyCho = (hang, cot) => {
    const gheId = `${String.fromCharCode(65 + hang - 1)}${cot}`;
    seats?.map(seat => {
      if (seat?.seatName === gheId) {
        OrderedSeat.current = seat;
      }
      return seat;
    });
    if (OrderedSeat.current?.seatName) {
      updateStatusSeat(OrderedSeat.current?.seatName, "/cancel");
    }
  };

  const renderGhe = () => {
    const soCot = 10; // Số lượng cột
    const soHang = 6; // Số lượng hàng

    const cotSo = [];
    for (let cot = 1; cot <= soCot; cot++) {
      cotSo.push(
        <Col key={`cotSo-${cot}`} className="cot-so">
          {cot}
        </Col>
      );
    }

    const gheJSX = [];
    for (let hang = 1; hang <= soHang; hang++) {
      const hangChuCai = String.fromCharCode(65 + hang - 1);
      const cotJSX = [];
      for (let cot = 1; cot <= soCot; cot++) {
        const gheId = `${hangChuCai}${cot}`;
        const s = seats?.map(seat => {
          if (seat?.seatName === gheId) {
            OrderedSeat.current = seat;
          }
          return seat;
        });
        let gheClassName = 'seat';
        let gheVariant = 'light';
        if (OrderedSeat.current) {
          gheClassName = 'orderedSeat';
          gheVariant = OrderedSeat.current.status === 'OrderedSeat' ? 'success' : 'light';
        }
        if (gheId === 'D4' || gheId === 'D5' || gheId === 'D6' || gheId === 'D7') {
          gheClassName += ' lockedSeat';
          gheVariant = 'secondary';
        }
        if (
          gheId === 'C3' ||
          gheId === 'C4' ||
          gheId === 'C5' ||
          gheId === 'C6' ||
          gheId === 'C7' ||
          gheId === 'C8' ||
          gheId === 'D3' ||
          gheId === 'D8'
        ) {
          gheClassName += ' vipSeat';
          gheVariant = 'danger';
          if (OrderedSeat.current && OrderedSeat.current.status === 'OrderedSeat') {
            gheVariant = 'success';
          }
        }
        cotJSX.push(
          <Col key={gheId} className={gheClassName}>
            {/* Ô button đại diện cho ghế */}
            <Button
              variant={gheVariant}
              onClick={() => datCho(hang, cot)}
              onDoubleClick={() => huyCho(hang, cot)}
              disabled={gheClassName.includes('lockedSeat')}
            >
              {gheId}
            </Button>
          </Col>
        );
      }
      gheJSX.push(
        <Row key={hang} className="hang mt-2 text-center">
          <Col className="hang-chucai text-center mt-2">{hangChuCai}</Col>
          {cotJSX}
        </Row>
      );
    }

    return (
      <>
        <Row className="hang text-center mb-3">
          <Col className="cot-so"></Col>
          {cotSo}
        </Row>
        {gheJSX}
      </>
    );
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
          <Button className="btn btn-success mt-3" style={{ width: "100%" }}>
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
    </Container>
  );
};

export default SeatForm;
