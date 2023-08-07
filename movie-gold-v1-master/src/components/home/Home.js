import Hero from '../hero/Hero';
import Cookies from 'js-cookie';
const Home = ({movies}) => {
  return (
    <Hero movies = {movies} />
  )
}

export default Home
