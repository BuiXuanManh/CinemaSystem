import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink,useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import'./Header.css';
import api from '../../api/axiosConfig';
import {message} from "antd";
import Cookies from 'js-cookie';
import { isLoggedIn, setLoggedIn } from "../../index.js";
import ReCAPTCHA from 'react-google-recaptcha';


export var userCurrentId= null;
export var userName = null;


export const Header = ({registerData, setRegisterData, loginData, setLoginData }) => {
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isLogin, setIsLogin] = useState(isLoggedIn);
  const [userData, setUserData] = useState({
    userid: "",
    refreshToken: "",
    accessToken: "",
  });
  const navigate= useNavigate();
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  useEffect(()=>{
    if(Cookies===undefined)
    setIsLogin(false)
  },[Cookies])
  const handleCaptchaVerify = () => {
    setCaptchaVerified(true);
  };
  const handleCaptchaExpired = () => {
    setCaptchaVerified(false);
  };
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
      setPasswordMismatch(true);
      return;
    }

    api
      .post("/api/auth/signup", registerData)
      .then((response) => {
        setPasswordMismatch(false);
        setTimeout(() => {
          message.success("Register success", 2)
        }, 0);
        closeRegisterModal();
        openLoginModal;
      })
      .catch((error) => {
        setPasswordMismatch(true);
        setTimeout(() => {
          message.error("Register failed", 2)
        }, 0);
      });
  };
	const handleViewOrderedSeats = () => {
    navigate(`/viewOrderedSeat/${Cookies.get('user_name')}`);
  };
  const handleLogin = () => {
    if (!captchaVerified) {
      return;
    }
    api
      .post("/api/auth/login", loginData)
      .then((response) => {
        setLoggedIn(true);
        setIsLogin(true);
        closeLoginModal();
        setTimeout(() => {
          message.success("Login success", 2)
        }, 0);
        
        const token = response.data.refreshToken;
        Cookies.set('auth_token', token, { expires: 2 });
        userName = loginData.username;
        setUserData({userid: response.data.userId, refreshToken: response.data.refreshToken, accessToken: response.data.accessToken});
        userCurrentId = response.data.userId;
        Cookies.set('user_id', response.data.userId, 2);
        Cookies.set('access_token', response.data.accessToken, 2);
        Cookies.set('user_name',loginData.username, 2);
        
      })
      .catch((error) => {
        setTimeout(() => {
          message.error("Login failed!!", 2)
        }, 0);
      });
  };

  const handleLogout = () => {
    console.log(Cookies.get('auth_token'))
    
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    
    api
      .post("/api/auth/logout", {userID: Cookies.get('user_id'), refreshToken: Cookies.get('auth_token'), accessToken: Cookies.get('access_token') }, config)
      .then((response) => {
        userName = null;
        setTimeout(() => {
          message.success("Logout success", 2)
        }, 0);
        setLoggedIn(false);
        setIsLogin(false);
        Cookies.remove('auth_token');
        Cookies.remove('user_id');
        Cookies.remove('user_name');
        Cookies.remove('access_token');
        userCurrentId = null;
      })
      .catch((error) => {
        setTimeout(() => {
          message.error("Logout failed", 2)
        }, 0);
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
          {isLogin ? ( 
            <Nav>
              <NavDropdown title={Cookies.get('user_name')} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleViewOrderedSeats}>View OrderedSeat</NavDropdown.Item>
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
          <div className="mb-3">
          <ReCAPTCHA
            sitekey="6LciN2gnAAAAADXsBkEN0u03rF8xRkULTfkbt6Ip"
            onChange={handleCaptchaVerify}
            onExpired={handleCaptchaExpired}
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