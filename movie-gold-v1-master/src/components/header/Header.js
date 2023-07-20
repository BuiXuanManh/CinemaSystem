import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import'./Header.css';
import { colors } from "@mui/material";

const Header = () => {
  const [userData, setUserData] = useState({
    userid: "",
    refreshToken: "",
    accessToken: "",
  });
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const openRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const closeRegisterModal = () => {
    setShowRegisterModal(false);
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleRegisterInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleRegister = () => {
    if (registerData.password !== registerData.confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    const registerEndpoint = "http://localhost:8081/api/auth/signup";
    axios
      .post(registerEndpoint, registerData)
      .then((response) => {
        setPasswordMismatch(false);
        closeRegisterModal();
      })
      .catch((error) => {
        setPasswordMismatch(true);
        console.error(error);
      });
  };

  const loginEndpoint = "http://localhost:8081/api/auth/login";
  const handleLogin = () => {
    axios
      .post(loginEndpoint, loginData)
      .then((response) => {
        closeLoginModal();
        alert("Login successful");
        setIsLoggedIn(true);
        setUsername(loginData.username);
        setUserData({userid: response.data.accessToken, refreshToken: response.data.refreshToken, accessToken: response.data.accessToken});
        
      })
      .catch((error) => {
        alert("Login failed. Invalid username or password");
        console.error(error);
      });
  };

  const handleLogout = () => {
    const logoutEndpoint = "http://localhost:8081/api/auth/logout"; 
    const refreshToken = localStorage.getItem("refreshToken");
    
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("day nè "+userData.refreshToken);
  
    axios
      .post(logoutEndpoint, userData, config)
      .then((response) => {
        setIsLoggedIn(false);
        setUsername("");
        alert("Logout successful");
      
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
      
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" style={{ color: "gold" }}>
          <FontAwesomeIcon icon={faVideoSlash} />Gold
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/watchList">
              Watch List
            </NavLink>
          </Nav>
          {isLoggedIn ? ( 
            <Nav>
              <NavDropdown title={username} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : ( 
            <Nav>
              <Button variant="outline-info" className="me-2" onClick={openLoginModal}>
                Login
              </Button>
              <Button variant="outline-info" onClick={openRegisterModal}>
                Register
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
      <Modal show={showRegisterModal} onHide={closeRegisterModal}>
        <Modal.Header>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="register-username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="register-username"
              name="username"
              value={registerData.username}
              onChange={handleRegisterInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="register-username" className="form-label">email</label>
            <input
              type="email"
              className="form-control"
              id="register-email"
              name="email"
              value={registerData.email}
              onChange={handleRegisterInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="register-password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="register-password"
              name="password"
              value={registerData.password}
              onChange={handleRegisterInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="register-confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="register-confirmPassword"
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleRegisterInputChange}
            />
          </div>
          {passwordMismatch && <label className="text-danger">Passwords do not match</label>}
        </Modal.Body>
        <Modal.Footer id="RFooter">
          <Button variant="danger" onClick={closeRegisterModal}>
            Close
          </Button>
          <Button variant="success" onClick={handleRegister}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showLoginModal} onHide={closeLoginModal}>
        <Modal.Header>
          <Modal.Title  id="titleLogin">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="login-username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="login-username"
              name="username"
              value={loginData.username}
              onChange={handleLoginInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="login-password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="login-password"
              name="password"
              value={loginData.password}
              onChange={handleLoginInputChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer id="LFooter">
          <Button variant="danger" onClick={closeLoginModal}>
            Close
          </Button>
          <Button variant="success" onClick={handleLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
}

export default Header;
