import { useEffect, useRef } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import ViewForm from '../viewform/ViewForm';
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { userCurrentId, userName } from '../header/Header.js';
import Modal from "react-bootstrap/Modal";

const Views = ({ getMovieData, movie, setMovie, reviews, setReviews, seats, setSaveMovies, saveMovies }) => {
    const navigate = useNavigate();
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
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, [])
    const addReview = async (e) => {
        if (userCurrentId != null) {
            e.preventDefault();
            
            const rev = revText.current;
            
            try {
                
                if (rev.value ?? false) {
                    const response = await api.post("/api/v1/views", { user: userName, reviewBody: rev.value, imdbId: movieId });

                    const updatedReviews = [...reviews, { body: rev.value }];

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
                                    <Button className='btn btn-warning mt-3' style={{ width: "100%" }}>Lưu</Button>
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
