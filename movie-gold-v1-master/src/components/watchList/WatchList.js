import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import './WatchList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Row } from 'react-bootstrap';
const WatchList = ({ getMovieData, saveMovies, movies, setSaveMovies }) => {

    const navigate = useNavigate();
    // var listSaveMovies2 = []
    // const counter = {}
    const params = useParams();
    const movieId = params.movieId;
    function views(movieId) {
        navigate(`/views/${movieId}`);
    }
    
    useEffect(() => {      
        if (Cookies.get('user_name') === undefined) {
            alert("not login")
            return;
          }
        //   getViewMovies();
    },[])
    
    return (
        <div className='movie-carousel-container'>
            <div className="row">
                {console.log(saveMovies)}
                {saveMovies?.map((movie) => (
                    <div key={movie.imdbId} className="col-lg-3 col-md-3 col-sm-3">
                        <div className="card mb-4 shadow-sm">
                            <Button onClick={() => views(movie.imdbId)}><img className="card-img-top custom-image" src={movie.poster} alt="" /></Button>
                            <div className="card-body bg-white text-brown">
                                <div className="movie-t2">
                                    <h5>{movie.title}</h5>
                                </div>
                                <div className="">
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