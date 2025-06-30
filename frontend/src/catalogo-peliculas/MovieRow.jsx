import './MovieRow.css';
import MovieCard from './MovieCard';

const sampleMovies = [
  {
    title: 'The Dark Knight',
    image: 'https://upload.wikimedia.org/wikipedia/en/8/8a/Dark_Knight.jpg',
    genres: ['Action', 'Drama'],
  },
  {
    title: 'Fight Club',
    image: 'https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg',
    genres: ['Drama'],
  },
  {
    title: 'Forrest Gump',
    image: 'https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg',
    genres: ['Drama', 'Romance'],
  },
  {
    title: 'Avengers: Endgame',
    image: 'https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg',
    genres: ['Action', 'Sci-Fi'],
  },
];

const MovieRow = ({ title,peliculas }) => {
  return (
    <div className="movie-row">
      <h2 className="genre-title">{title}</h2>
      <div className="row-scroll">
        {peliculas.map((movie, idx) => (
          <MovieCard key={idx} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
