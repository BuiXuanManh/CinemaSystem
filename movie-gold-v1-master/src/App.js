import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
<<<<<<< HEAD
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';
=======
import Views from './components/views/Views';
import NotFound from './components/notFound/NotFound';
import SeatForm from './components/seatForm/SeatForm';
>>>>>>> manh

function App() {

  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getMovies = async () =>{
    
    try
    {

      const response = await api.get("/api/v1/movies");

      setMovies(response.data);

    } 
    catch(err)
    {
      console.log(err);
    }
  }

  const getMovieData = async (movieId) => {
     
    try 
    {
        const response = await api.get(`/api/v1/movies/${movieId}`);

        const singleMovie = response.data;

        setMovie(singleMovie);
<<<<<<< HEAD

=======
>>>>>>> manh
        setReviews(singleMovie.reviews);
        

    } 
    catch (error) 
    {
      console.error(error);
    }

  }

  useEffect(() => {
    getMovies();
  },[])

  return (
    <div className="App">
      <Header/>
      <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<Home movies={movies} />} ></Route>
            <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
<<<<<<< HEAD
            <Route path="/Reviews/:movieId" element ={<Reviews getMovieData = {getMovieData} movie={movie} reviews ={reviews} setReviews = {setReviews} />}></Route>
=======
            <Route path="/views/:movieId" element ={<Views getMovieData = {getMovieData} movie={movie} reviews ={reviews} setReviews = {setReviews} />}></Route>
            <Route path='/views/seats/:moviedId' element={<SeatForm movie={movie} />}/>
>>>>>>> manh
            <Route path="*" element = {<NotFound/>}></Route>
          </Route>
      </Routes>

    </div>
  );
}

export default App;
