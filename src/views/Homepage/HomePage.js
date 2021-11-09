import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import * as movieAPI from "../../services/movies-api";
import PageHeading from "../../components/PageHeading/PageHeading";
import s from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    movieAPI.fetchTrendingMovies().then(({ results }) => {
      setMovies(results);
    });
  }, []);

  return (
    <>
      <PageHeading text="Trending today" />
      {movies && (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link
                className={s.MovieGalleryItem}
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { from: { location } },
                }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
