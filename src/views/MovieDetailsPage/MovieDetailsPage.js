import { useState, useEffect, Suspense, useRef, lazy } from "react";
import {
  NavLink,
  useRouteMatch,
  useParams,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import * as movieAPI from "../../services/movies-api";
import PageHeading from "../../components/PageHeading/PageHeading";
import s from "./MovieDetailsPage.module.css";

const Cast = lazy(() => import("../Cast" /* webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import("../Reviews" /* webpackChunkName: "reviews" */)
);

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const currentRef = useRef(location.state?.from?.location).current;

  useEffect(() => {
    movieAPI.fetchMovieDetails(movieId).then((data) => {
      setMovie(data);
    });
  }, [movieId]);

  const onGoBack = () => {
    history.push(currentRef ?? `/`);
  };

  return (
    <>
      {movie && (
        <>
          <PageHeading text={`${movie.title}`} />
          <button className={s.button} type="button" onClick={onGoBack}>
            Go Back
          </button>
          <div className={s.wrapper}>
            <img
              className={s.posterImg}
              src={
                movie.poster_path !== null
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
              }
              alt={movie.title}
            />
            <div>
              <h2>{movie.title}</h2>
              <p>User Score: {movie.vote_average * 10}%</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <ul>
                {movie.genres.map(({ id, name }) => {
                  return <li key={id}>{name}</li>;
                })}
              </ul>
            </div>
          </div>
        </>
      )}
      <hr />
      <p>Additional information</p>

      {movie && (
        <ul>
          <li>
            <NavLink
              to={`${url}/cast`}
              className={s.link}
              activeClassName={s.activeLink}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/reviews`}
              className={s.link}
              activeClassName={s.activeLink}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      )}

      <Suspense fallback={<h2>Loading...</h2>}>
        <Switch>
          <Route path={`${path}/cast`}>
            <Cast />
          </Route>
          <Route path={`${path}/reviews`}>
            <Reviews />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}
