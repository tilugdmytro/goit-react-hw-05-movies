import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as movieAPI from "../services/movies-api";
import defaultImg from "../images/default-img.jpg";
import s from "../views/MovieDetailsPage/MovieDetailsPage.module.css";

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState();

  useEffect(() => {
    movieAPI.fetchMovieCredits(movieId).then(({ cast }) => {
      setCast(cast);
    });
  }, [movieId]);

  const imgurl = "https://image.tmdb.org/t/p/w500";

  return (
    <div>
      {cast && (
        <ul>
          {cast
            .map(({ id, name, character, profile_path }) => (
              <li key={id}>
                {profile_path ? (
                  <img
                    className={s.castImg}
                    src={`${imgurl}${profile_path}`}
                    alt={name}
                  />
                ) : (
                  <img className={s.castImg} src={defaultImg} alt={name} />
                )}
                <p>Actor: {name}</p>
                <p>Character: {character}</p>
              </li>
            ))
            .slice(0, 12)}
        </ul>
      )}
    </div>
  );
}
