import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import Cookies from 'js-cookie';
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
                                        <div className="movie-card" style={{ "--img": `url(${movie?.backdrops[0]})` }}>
                                            <div className="movie-detail">
                                                <div className='col-md-2'>
                                                <div className="movie-poster">
                                                    <Button className='btn btn-secondary' onClick={() => views(movie?.imdbId)}><img style={{height:'275px', width:'100%'}} src={movie.poster} alt="" /></Button>
                                                </div>
                                                </div>
                                                <div className="movie-title">
                                                    <h4>{movie.title}</h4>
                                                </div>
                                                <div className="movie-buttons-container justify-content-center">
                                                    <Link to={`/Trailer/${movie.trailerLink.substring(movie?.trailerLink.length - 11)}`}>
                                                        <div className="play-button-icon-container">
                                                            <FontAwesomeIcon className="play-button-icon mr-2"
                                                                icon={faCirclePlay}
                                                            />
                                                        </div>
                                                    </Link>

                                                    <div className="movie-review-button-container mr-2 ">
                                                        <Button variant="info" className='mr-2' onClick={() => views(movie?.imdbId)} >View</Button>
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
                            <Button onClick={() => views(movie.imdbId)}><img className="card-img-top custom-image" src={movie.poster} alt="" /></Button>
                            <div className="card-body bg-white text-brown">
                                <div className="movie-t2">
                                    <h5>{movie.title}</h5>
                                </div>
                                <div className="">
                                    <small className="text-muted"></small>
                                    <div className="row">
                                        
                                        <div className="row">
                                        <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                            <div className="row">
                                                <FontAwesomeIcon className="play-button-icon col" icon={faCirclePlay} />
                                                <Button className="col" variant="info" onClick={() => views(movie.imdbId)}>Views</Button>
                                            </div>
                                        </Link>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div >
            )
}

export default Hero