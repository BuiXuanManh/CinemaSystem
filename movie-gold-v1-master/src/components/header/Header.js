import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [registerData, setRegisterData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleRegister = () => {
    if (registerData.password !== registerData.confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    const registerEndpoint = "http://localhost:8080/register"; 
    axios.post(registerEndpoint, registerData)
      .then(response => {
        alert.register("Registration successful");  
        closeModal();
      })
      .catch(error => {
       alert("Registration failed!! User name is exist");    
        console.error(error);
      });
    closeModal();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" style={{ color: 'gold' }}>
          <FontAwesomeIcon icon={faVideoSlash} />Gold
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/watchList">Watch List</NavLink>
          </Nav>
          <Button variant="outline-info" className="me-2" onClick={openModal}>Login</Button>
          <Button variant="outline-info" onClick={openModal}>Register</Button>
        </Navbar.Collapse>
      </Container>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={registerData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={registerData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRegister}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
}

export default Header;
