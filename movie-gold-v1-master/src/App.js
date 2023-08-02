import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Views from './components/views/Views';
import NotFound from './components/notFound/NotFound';
import SeatForm from './components/seatForm/SeatForm';
import Pay from './components/pay/Pay';
import WatchList from './components/watchList/WatchList';

export let isLoggedIn = false;

function App() {

  


  const [movies, setMovies] = useState();
  const [saveMovies, setSaveMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState(['']);
  const [seats, setSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
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
        setReviews(singleMovie.reviews);
        setSeats(singleMovie.seats)
        

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
      <Header registerData={registerData} setRegisterData={setRegisterData} loginData={loginData} setLoginData={setLoginData} />
      <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<Home movies={movies} />} ></Route>
            <Route path="/watchList" element={<WatchList movies={movies} saveMovies={saveMovies} setSaveMovies={setSaveMovies}  />} ></Route>
            <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
            <Route path="/views/:movieId" element ={<Views getMovieData = {getMovieData} movie={movie} setMovie={setMovie} reviews ={reviews} setReviews = {setReviews} setSaveMovies={setSaveMovies}/>}></Route>
            <Route path='/views/seats/:movieId' element={<SeatForm setTotalPrice={setTotalPrice} getMovieData = {getMovieData}  seats={seats} setSeats={setSeats}  />}/>
            <Route path='/pay/:movieId' element={<Pay totalPrice={totalPrice} seats={seats} loginData={loginData} />}/>
            <Route path="*" element = {<NotFound/>}></Route>
          </Route>
      </Routes>

    </div>
  );
}

export default App;
