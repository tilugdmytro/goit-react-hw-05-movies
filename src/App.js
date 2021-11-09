import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Container from "./components/Container/Container";
import AppBar from "./components/AppBar/AppBar";

const HomePage = lazy(() =>
  import("./views/Homepage/HomePage" /* webpackChunkName: "home-page" */)
);
const MoviesPage = lazy(() =>
  import("./views/MoviesPage" /* webpackChunkName: "movies-page" */)
);
const MovieDetailsPage = lazy(() =>
  import(
    "./views/MovieDetailsPage/MovieDetailsPage" /* webpackChunkName: "movie-detail-page" */
  )
);
const NotFoundView = lazy(() =>
  import("./views/NotFoundView" /* webpackChunkName: "not-found-view" */)
);

function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<h2>Loading...</h2>}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <MoviesPage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
export default App;
