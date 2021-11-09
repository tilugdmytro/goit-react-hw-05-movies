import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as movieAPI from "../services/movies-api";

export default function Cast() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const message = "No reviews for this movie";

  useEffect(() => {
    movieAPI.fetchMovieReviews(movieId).then(({ results }) => {
      setReviews(results);
    });
  }, [movieId]);

  return (
    <div>
      {reviews && (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <h2>Author: {author}</h2>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
      {reviews.length === 0 && message}
    </div>
  );
}
