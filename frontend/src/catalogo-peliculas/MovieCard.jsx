import './MovieCard.css';
import { FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const imagen = movie.poster_path?.startsWith('http')
    ? movie.poster_path
    : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const generos = Array.isArray(movie.generos) 
    ? movie.generos.join(', ') 
    : 'Género desconocido';

  return (
    <div className="movie-card">
      <img src={imagen} alt={movie.title || 'Película'} />
      <div className="overlay">
        <h3>{movie.title || 'Sin título'}</h3>
        <p>{generos}</p>
        <button onClick={() => navigate(`/ver/${movie.id}`)}>Ver</button>
      </div>
    </div>
  );
};

export default MovieCard;
