import './Home.css';
import Navbar from './Navbar';
import MovieRow from './MovieRow';

export const Home = () => {
  return (
    <div className="home-container">
      <Navbar />

      <MovieRow title="Recomendados para ti" />
      <MovieRow title="Acción" />
      <MovieRow title="Crimen" />
    </div>
  );
};

export default Home;
