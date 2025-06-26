import './MovieCard.css';
import { FaPlay } from 'react-icons/fa';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.image} alt={movie.title} />
      <div className="overlay">
        <h3>{movie.title}</h3>
        <p>{movie.genres.join(', ')}</p>
        <button>
          <FaPlay /> Watch
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
