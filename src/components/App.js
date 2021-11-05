import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./Searchbar/Searchbar.module.css";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import Button from "./Button/Button";
import imageAPI from "../services/image-api";
import Spinner from "./Spinner/Spinner";

function App() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImg, setLargeImg] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (query === "") {
      return;
    }
    setStatus("pending");
    imageAPI
      .fetchImage(query, page)
      .then(({ hits }) => {
        setData([
          ...data,
          ...hits.map(({ id, webformatURL, largeImageURL }) => ({
            id,
            webformatURL,
            largeImageURL,
          })),
        ]);
      })
      .catch((error) => setError(error))
      .finally(() => setStatus("resolved"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page]);

  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });

  const handleSubmit = (query) => {
    resetPage();
    setQuery(query);
  };

  const resetPage = () => {
    setPage(1);
    setData([]);
    setShowModal(false);
    setStatus("idle");
  };

  const handleLoadMore = () => {
    setPage((page) => page + 1);
  };

  const handleLargeImage = (event) => {
    setShowModal(true);
    setLargeImg(event.currentTarget.alt);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmit} />

      {status === "idle" && (
        <h1 className={s.SearchbarTitle}>Введите запрос</h1>
      )}

      {data.length > 0 && (
        <ImageGallery data={data} handleLargeImage={handleLargeImage} />
      )}

      {data.length >= 12 && status === "resolved" && (
        <Button handleLoadMore={handleLoadMore} />
      )}

      {data.length === 0 && status === "resolved" && (
        <h2 className={s.SearchbarTitle}>
          По запросу "{query}" ничего не найдено
        </h2>
      )}

      {showModal && <Modal largeImg={largeImg} onClose={toggleModal} />}

      {status === "pending" && <Spinner />}

      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
