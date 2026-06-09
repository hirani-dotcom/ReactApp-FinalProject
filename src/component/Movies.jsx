import React, { useState } from "react";
import Modal from "./Modal";
import NoImage from "../assets/no_poster.avif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Movies = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const API_KEY = "300143c";

    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [sortOption, setSortOption] = useState("alpha");
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch movies by title
    const fetchMovies = async () => {
        if (!query.trim()) {
            setError("~~~ Please enter a movie keyword. ~~~");
            return;
        }
        setError("");
        setLoading(true);
        setSelectedMovie(null);

        try {
            const res = await fetch(
                `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`,
            );
            const data = await res.json();

            if (data.Response === "False") {
                setMovies([]);
                setError(data.Error || "No movies found.");
            } else {
                let results = data.Search;

                // Sort results
                if (sortOption === "a-z") {
                    results.sort((a, b) => a.Title.localeCompare(b.Title));
                } else if (sortOption === "z-a") {
                    results.sort((a, b) => b.Title.localeCompare(a.Title));
                } else if (sortOption === "old to new") {
                    results.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
                } else if (sortOption === "new to old") {
                    results.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
                }

                // Limit to first 6
                setMovies(results.slice(0, 6));
            }
        } catch (err) {
            setError("Failed to fetch movies. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch details for a selected movie
    const fetchMovieDetails = async (imdbID) => {
        setLoading(true);
        try {
            const res = await fetch(
                `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`,
            );
            const data = await res.json();
            if (data.Response === "True") {
                setSelectedMovie(data);
            } else {
                setError("Failed to load movie details.");
            }
        } catch {
            setError("Error fetching movie details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="movies">
            <div className="container">
                <h1>Movie Search</h1>

                <h2>
                    Find your
                    <strong> All-Time Favorite </strong>
                    movies
                    <br />
                    with 🎬 Silver Screen World
                </h2>

                <div className="search-container">
                    <input
                        type="text" className="input__size"
                        placeholder="Enter movie title..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    <select className="sortbox__size"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="Default" disabled>
                        </option>
                        <option value="a-z">A-Z</option>
                        <option value="z-a">Z-A</option>
                        <option value="old to new">Old to New</option>
                        <option value="new to old">New to Old</option>
                    </select>

                    <button
                        onClick={fetchMovies}
                        className="btn search__btn"
                    >
                        Search
                    </button>
                </div>

                {error && (
                    <p className="error-message">{error}</p>
                )}

                {/* Loading */}
                {loading && <p>Loading...</p>}

                {/* Movies List */}
                <div className="movies">
                    {movies.map((movie) => (
                        <div
                            key={movie.imdbID}
                            onClick={() => fetchMovieDetails(movie.imdbID)}
                            className="movie"
                        >
                            <img
                                src={
                                    movie.Poster !== "(Not Found)"
                                        ? movie.Poster
                                        : "https://via.placeholder.com/150"
                                }
                                alt={movie.Title}
                                className="movie__img"
                            />
                            <h4 className="movie__title">{movie.Title}</h4>
                            <p className="movie__year">{movie.Year}</p>
                        </div>
                    ))}
                </div>

                {/* Movie Modal */}
                {selectedMovie && (
                    <div className="modal-overlay">
                        <button
                            className="overlay__close"
                        >
                            Choose Another Movie or Search Again
                        </button>
                        <figure className="overlay__img">
                            <img
                                src={
                                    selectedMovie.Poster !== "N/A"
                                        ? selectedMovie.Poster
                                        : "https://via.placeholder.com/200"
                                }
                                alt={selectedMovie.Title}
                            />
                        </figure>
                        <div className="overlay__detail">
                            <h2 className="overlay__title">
                                {selectedMovie.Title}
                                <br />({selectedMovie.Year})
                            </h2>
                            <p className="overlay__details--title">
                                <strong>Genre: </strong>
                                <span className="overlay__info">
                                    {" "}
                                    {selectedMovie.Genre}
                                </span>
                            </p>
                            <p className="overlay__details--title">
                                <strong>Director:</strong>
                                <span className="overlay__info">
                                    {" "}
                                    {selectedMovie.Director}
                                </span>
                            </p>
                            <p className="overlay__details--title">
                                <strong>Actors:</strong>
                                <span className="overlay__info">
                                    {" "}
                                    {selectedMovie.Actors}
                                </span>
                            </p>
                            <p className="overlay__details--title">
                                <strong>Plot:</strong>
                                <span className="overlay__info">
                                    {" "}
                                    {selectedMovie.Plot}
                                </span>
                            </p>
                            <p className="overlay__details--title">
                                <strong>IMDB Rating:</strong>
                                <span className="overlay__info">
                                    {" "}
                                    {selectedMovie.imdbRating}
                                </span>
                            </p>
                        </div>
                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      </Modal>
      
                    </div>

                )}
            </div>
        </section>
    );
};

export default Movies;
