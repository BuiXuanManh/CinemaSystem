import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Views from './components/views/Views';
import NotFound from './components/notFound/NotFound';
import SeatForm from './components/seatForm/SeatForm';
import Pay from './components/pay/Pay';
import WatchList from './components/watchList/WatchList';
import ViewOrdered from './components/ViewOrdered/ViewOrdered';

function App() {

  const [movies, setMovies] = useState();
  const [saveMovies, setSaveMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState(['']);
  const [seats, setSeats] = useState([]);
  const [user, setUser] = useState();
  const [orderedSeat, setOrderedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const [userSeat, setUserSeat] = useState([]);
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
  const [userData, setUserData] = useState({
    userid: "",
    refreshToken: "",
    accessToken: "",
  });
  useEffect(() => {
    getMovies();
  }, [])
  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      setMovies(response.data);
    } catch (err) {
      console.log("Lỗi khi lấy danh sách phim từ backend:", err);
    }
  }

  const getMovieData = async (imdbId) => {
    try {
      const response = await api.get(`/api/v1/movies/${imdbId}`);
      const singleMovie = response.data;
      setMovie(singleMovie);
    } catch (error) {
      console.log("Lỗi khi lấy thông tin phim đơn lẻ từ backend:", error);
    }
  }

  return (
    <div className="App">
      <Header userData={userData} setUserData={setUserData} registerData={registerData} setRegisterData={setRegisterData} loginData={loginData} setLoginData={setLoginData} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />} ></Route>
          <Route path="/viewOrderedSeat/:username" element={<ViewOrdered userSeat={userSeat} setUserSeat={setUserSeat} user={user} setUser={setUser} loginData={loginData} />} ></Route>
          <Route path="/watchList" element={<WatchList movies={movies} saveMovies={saveMovies} setSaveMovies={setSaveMovies} />} ></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
          <Route path="/views/:movieId" element={<Views getMovieData={getMovieData} movie={movie} setMovie={setMovie} reviews={reviews} setReviews={setReviews} setSaveMovies={setSaveMovies} />}></Route>
          <Route path='/views/seats/:movieId' element={<SeatForm loginData={loginData} orderedSeat={orderedSeat} setOrderedSeats={setOrderedSeats} setTotalPrice={setTotalPrice} getMovieData={getMovieData} seats={seats} setSeats={setSeats} />} />
          <Route path='/pay/:movieId' element={<Pay loginData={loginData} orderedSeat={orderedSeat} getMovieData={getMovieData} totalPrice={totalPrice} />} />
        </Route>
      </Routes>

    </div>
  );
}

export default App;
