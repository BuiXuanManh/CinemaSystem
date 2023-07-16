


import './SeatForm.css'
import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const SeatForm = function GiaoDienDatCho() {
  const [danhSachGhe, setDanhSachGhe] = useState([]);
  const datCho = (hang, cot) => {
    const gheId = `${String.fromCharCode(65 + hang - 1)}${cot}`;
    const gheDaDat = danhSachGhe.find(ghe => ghe.id === gheId);
    if (gheDaDat) {
      gheDaDat.daDat = !gheDaDat.daDat;
      setDanhSachGhe([...danhSachGhe]);
    } else {
      const gheMoi = { id: gheId, daDat: true };
      setDanhSachGhe([...danhSachGhe, gheMoi]);
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
        const gheClassName = gheDaDat && gheDaDat.daDat ? 'ghe-da-dat' : 'ghe';
        cotJSX.push(
          <Col key={gheId} className={gheClassName}>
            {/* Ô button đại diện cho ghế */}
            <Button
              variant={gheDaDat && gheDaDat.daDat ? 'success' : 'light'}
              onClick={() => datCho(hang, cot)}
            >
              {gheId}
            </Button>
          </Col>
        );
      }
      gheJSX.push(
        <Row key={hang} className="hang">
          <Col className="hang-chucai">{hangChuCai}</Col>
          {cotJSX}
        </Row>
      );
    }

    return (
      <>
        <Row className="hang">
          <Col className="cot-so"></Col>
          {cotSo}
        </Row>
        {gheJSX}
      </>
    );
  };

  return (
    <Container className="giao-dien-dat-cho">
      <h2>Đặt chỗ ngồi</h2>
      {renderGhe()}
      <Button className='btn btn-success mt-3' style={{ width: "100%" }}>Đặt vé</Button>
    </Container>
  );
}

export default SeatForm;