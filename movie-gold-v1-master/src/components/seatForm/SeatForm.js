/**
 * Sửa code trên để mặc định ghế số D4-D7 là khóa (không thể chọn, màu xám).
 * Thêm chú thích vào đoạn dưới:
 * - Ghế khóa (không thể chọn, mặc định là ghế từ D4-D7, màu xám)
 * - Ghế VIP (có thể chọn, mặc định là ghế từ C3-C8, màu đỏ nhạt)
 * 
 * @function 
 * @name sửaCode
 *
 * @param {object} movie - Thông tin về phim.
 *
 * @returns {JSX.Element} Giao diện đặt chỗ với ghế mặc định D4-D7 là khóa và ghế VIP từ C3-C8.
 */
import './SeatForm.css'
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const SeatForm = (movie) => {
  const [danhSachGhe, setDanhSachGhe] = useState([]);
  const [tongGia, setTongGia] = useState(0);

  const datCho = (hang, cot) => {
    const gheId = `${String.fromCharCode(65 + hang - 1)}${cot}`;
    const gheDaDat = danhSachGhe.find(ghe => ghe.id === gheId);
  
    if (gheDaDat) {
      // Nếu ghế đã được chọn, bỏ khỏi danh sách
      const danhSachGheMoi = danhSachGhe.filter(ghe => ghe.id !== gheId);
      setDanhSachGhe(danhSachGheMoi);
    } else {
      // Nếu ghế chưa được chọn, thêm vào danh sách
      const gheMoi = { id: gheId, daDat: true };
      setDanhSachGhe([...danhSachGhe, gheMoi]);
    }
  };
  useEffect(() => {
    tinhTongGia();
  }, [danhSachGhe]);
  const tinhTongGia = () => {
    let tongGiaMoi = 0;

    danhSachGhe.forEach(ghe => {
      if( ghe.daDat = true){
      if (ghe.id === 'C3' || ghe.id === 'C4' || ghe.id === 'C5' || ghe.id === 'C6' || ghe.id === 'C7' || ghe.id === 'C8') {
        tongGiaMoi += 60000;
      } else {
        tongGiaMoi += 50000;
      }}
    });

    setTongGia(tongGiaMoi);
  };

  const huyCho = (hang, cot) => {
    const gheId = `${String.fromCharCode(65 + hang - 1)}${cot}`;
    const gheDaDat = danhSachGhe.find(ghe => ghe.id === gheId);
    if (gheDaDat) {
      gheDaDat.daDat = false;
      setDanhSachGhe([...danhSachGhe]);
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
        const gheDaDat = danhSachGhe.find(ghe => ghe.id === gheId);
        let gheClassName = 'seat';
        let gheVariant = 'light';
        if (gheDaDat) {
          gheClassName = 'orderedSeat';
          gheVariant = gheDaDat.daDat ? 'success' : 'light';
        }
        if (gheId === 'D4' || gheId === 'D5' || gheId === 'D6' || gheId === 'D7') {
          gheClassName += ' lockedSeat';
          gheVariant = 'secondary';
        }
        if (gheId === 'C3' || gheId === 'C4' || gheId === 'C5' || gheId === 'C6' || gheId === 'C7' || gheId === 'C8') {
          gheClassName += ' vipSeat';
          gheVariant = 'danger';
          if (gheDaDat && gheDaDat.daDat) {
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
      <Row className='justify-content-center mt-3 mb-3'>
        <Col>
          <h2 className='text-center mt-3'>SEATS ORDER</h2>
        </Col>
      </Row>

      {renderGhe()}
      <Row className='justify-content-center mt-3'>
        <Col>
          <hr></hr>
        </Col>
      </Row>
      <Row className='justify-content-center mt-3'>
        <Col className='col-md-9'>
          <Button className='btn btn-success mt-3' style={{ width: "100%" }}>Thanh toán</Button>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Button className='col-md-1' variant='light' disabled />
        <span className="col-md-3 ml-1">Ghế trống</span>
        <span className="col-md-1 ml-1">Giá:</span>
        <span className="col-md-1">50000</span>
      </Row>
      <Row className='mt-3'>
        <Button className='col-md-1' variant='success' disabled />
        <span className="col-md-3 ml-1">Ghế chọn</span>
        <span className="col-md-1 ml-1">Tổng giá:</span>
        <span className="col-md-1">{tongGia}</span>
        {console.log(tongGia)}
      </Row>
      <Row className='mt-3'>
        <Button className='col-md-1' variant='danger' disabled />
        <span className="col-md-3 ml-1">Ghế VIP</span>
        <span className="col-md-1 ml-1">Giá:</span>
        <span className="col-md-1">60000</span>
      </Row>
      <Row className='mt-3'>
        <Button className='col-md-1' variant='secondary' disabled />
        <span className="col-md-3 ml-1">Ghế đã khóa</span>
      </Row>

    </Container>
  );
}

export default SeatForm;
