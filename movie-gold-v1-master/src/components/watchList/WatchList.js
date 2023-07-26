import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

const WatchList = ({ movies, saveMovies, setSaveMovies }) => {

    const navigate = useNavigate();

    function views(movieId) {
        navigate(`/views/${movieId}`);
    }

    return (
        <div className='movie-carousel-container'>
            <div className="row">
                {movies?.map((movie) => (
                    <div key={movie.imdbId} className="col-lg-3 col-md-3 col-sm-3">
                        <div className="card mb-4 shadow-sm">
                            <Button onClick={() => views(movie.imdbId)}><img className="card-img-top" src={movie.poster} alt="" /></Button>
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

export default WatchList