import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import s from "./Searchbar.module.css";

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    const { value } = event.currentTarget;
    setQuery(value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim() === "") {
      return toast.error("Введите запрос!");
    }
    onSubmit(query);
    reset();
  };

  const reset = () => {
    setQuery("");
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          name="query"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
