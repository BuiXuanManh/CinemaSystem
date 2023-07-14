import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper, colors } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

const Hero = ({ movies }) => {

    const navigate = useNavigate();

    function views(movieId) {
        navigate(`/views/${movieId}`);
    }

    return (
        <div className='movie-carousel-container'>
            <Carousel>
                {
                    movies?.map((movie) => {
                        return (
                            <Paper>
                                <Paper key={movie.imdbId}>
                                    <div className='movie-card-container'>
                                        <div className="movie-card" style={{ "--img": `url(${movie.backdrops[0]})` }}>
                                            <div className="movie-detail">
                                                <div className="movie-poster">
                                                <Button onClick={() => views(movie.imdbId)}><img className="card-img-top" src={movie.poster} alt="" /></Button>
                                                </div>
                                                <div className="movie-title">
                                                    <h4>{movie.title}</h4>
                                                </div>
                                                <div className="movie-buttons-container">
                                                    <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                                        <div className="play-button-icon-container">
                                                            <FontAwesomeIcon className="play-button-icon"
                                                                icon={faCirclePlay}
                                                            />
                                                        </div>
                                                    </Link>

                                                    <div className="movie-review-button-container">
                                                        <Button variant="info" onClick={() => views(movie.imdbId)} >Reviews</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </Paper>

                            </Paper>
                        )
                    })
                }

            </Carousel>
            <div className="row">
                {movies?.map((movie) => (
                    <div key={movie.imdbId} className="col-lg-3 col-md-3 col-sm-3">
                        <div className="card mb-4 shadow-sm">
                            <Button onClick={() => views(movie.imdbId)}><img className="card-img-top" src={movie.poster} alt="" /></Button>
                            <div className="card-body bg-white text-brown">
                            <div className="movie-t2">
                                                    <h5>{movie.title}</h5>
                                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <small className="text-muted"></small>
                                    <div className="btn-group">
                                        <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                            <div className="play-button-icon-container">
                                                <FontAwesomeIcon className="play-button-icon" icon={faCirclePlay} />
                                            </div>
                                        </Link>
                                        <div className="btnReview">
                                            <Button className="col=sm-2" variant="info" onClick={() => views(movie.imdbId)}>Views</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Hero
