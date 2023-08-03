import { useEffect, useRef } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import ViewForm from '../viewform/ViewForm';
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { userCurrentId, userName } from '../header/Header.js';
import Modal from "react-bootstrap/Modal";
import Cookies from 'js-cookie';
const Views = ({ getMovieData, movie, setMovie, reviews, setReviews, setSaveMovies, saveMovies }) => {
    const navigate = useNavigate();
    const params = useParams();
    const movieId = params.movieId;

    function naseats(movieId) {
        setMovie(movie);
        navigate(`/views/seats/${movieId}`);
    }
    useEffect(() => {      
          getMovieData(movieId);
    }, [])
    const listStateMovies = 'list_state_movies'
    var listSaveMovies = []
    const handleSaveMovies = (movie) => {
        setSaveMovies((prevMovies) => {
          // Kiểm tra nếu movie đã tồn tại trong prevMovies thì không thêm vào
            if (prevMovies?.some((pmovie) => pmovie === movie)) {
            handleSetNone()
            return prevMovies;
            }
            // Nếu movie chưa tồn tại trong prevMovies thì thêm vào
            // handleSetBlock()
            return [...prevMovies, movie];
        });
        // alert("Lưu thành công");
        // console.log(saveMovies)
      };

    // const handleUnsaveMovie = () => {
    //     for(let i = 0; i < saveMovies.length; i++){
    //         if(movie.movieId == saveMovies[i].movieId)
    //             saveMovies = saveMovies.filter(movie => movie !== saveMovies)
    //             // console.log(movie)
    //     }
    // }

    const handleSetNone = () => {
        setNone('block')
        setBlock('none')
        let stateMovie = {
            flag : 1,
            movie_id : movieId
        }
        listSaveMovies.push(stateMovie)
        // listSaveMovies2 = listSaveMovies
        localStorage.setItem(listStateMovies, JSON.stringify(listSaveMovies)) 
        // console.log(listSaveMovies)
    }

    const handleSetBlock = () => {
        setNone('none')
        setBlock('block')
    }   

    // var listSaveMovies2 = []
    const [none, setNone] = useState("none");
    const [block, setBlock] = useState("block");
    function naseats(movieId) {
        setMovie(movie);
        navigate(`/views/seats/${movieId}`);
    }
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        setShowModal(false);
    };
    const revText = useRef();
    const seatText = useRef();

    useEffect(() => {
        getMovieData(movieId);
    }, [])
    const addReview = async (e) => {
        if (Cookies.get('user_name') != null) {
            e.preventDefault();            
            const rev = revText.current;            
            try {
                
                if (rev.value ?? false) {
                    const response = await api.post("/api/v1/views", { user: Cookies.get('user_name'), reviewBody: rev.value, imdbId: movieId });

                    const updatedReviews = [...reviews, { body: rev.value,userName: Cookies.get('user_name') }];

                    rev.value = "";

                    setReviews(updatedReviews);
                }
            }
            catch (err) {
                console.error(err);
            }
        }
        else {
            setShowModal(true);
        }
    }
    return (
        <Container>

            <Row className="mt-2">
                <Row>
                    <Col><h3>{movie?.title}</h3></Col>
                </Row>
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    {
                        <>
                            <Row className='mt-2'>
                                <Col className='col-md-4'>
                                    <label>Thể loại:</label>
                                </Col>
                                {movie?.genres.map((r) => {
                                    return (
                                        <>
                                            <Col className='ml-2 col-md-2 align-items-center justify-content-center'>{r}</Col>
                                        </>
                                    )
                                })}
                            </Row>
                            <Row className='mt-2'>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col className='col-md-5'>
                                    <label>Thời gian chiếu:</label>
                                </Col>
                                <Col className='col-md-5 d-flex align-items-center justify-content-center'>
                                    <label>{movie?.showtime}</label>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col className='col-md-5'>
                                    <label>Thời lượng:</label>
                                </Col>
                                <Col className='col-md-5 d-flex align-items-center justify-content-center'>
                                    <label>{movie?.duration}</label>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col className='col-md-5'>
                                    <label>Giá vé:</label>
                                </Col>
                                <Col className='col-md-5 d-flex align-items-center justify-content-center'>
                                    <label>{movie?.ticketPrice}</label>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col className='col-md-5'>
                                    <label>Số ghế:</label>
                                </Col>
                                <Col className='col-md-5 d-flex align-items-center justify-content-center'>
                                    <label>{movie?.seatOrdered}/{movie?.seatMax}</label>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>
                                    <Button onClick={() => naseats(movie?.imdbId)} className='btn btn-success mt-3' style={{ width: "100%" }}>Đặt vé</Button>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>
                                <Button onClick={() => {
                                    handleSaveMovies(movie)
                                    // handleSetNone()
                                    }
                                }
                                     className='btn btn-warning mt-3'  style={{ width: "100%", display: `${block}`}}>Lưu</Button>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>
                                <Button onClick={() => {
                                    // handleUnsaveMovie()
                                    handleSetBlock()
                                    } 
                                }
                                    className='btn btn-danger mt-3'  style={{ width: "100%", display: `${none}`}}>Hủy lưu</Button>
                                </Col>
                            </Row>

                            <Row className='mt-3'>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                            <Row className='' style={{ marginTop: '10%' }}>
                                <Col>
                                    <ViewForm handleSubmit={addReview} revText={revText} labelText="Viết bình luận?" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </>
                    }
                    {
                        reviews?.map((r) => {
                            return (
                                <>
                                    <Row>
                                        <Col>{r.userName + ": " + r.body}</Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr />
                                        </Col>
                                    </Row>
                                </>
                            )
                        })
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
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
    )
}

export default Views
