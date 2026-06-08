import React, { useState } from "react";

const Movies = () => {

    

    // Replace with your OMDb API key
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
            setError("*** Please enter a movie keyword. ***");
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
                    <span className="purple"> All-Time Favorite </span>
                    movies
                    <br />
                    with 🎬 Silver Screen World
                </h2>

                {/* Search Input */}
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Enter movie title..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        style={{ padding: "8px", width: "250px" }}
                    />

                    {/* Sort Option */}
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        style={{ marginLeft: "10px", padding: "8px" }}
                    >
                        <option value="Default" disabled>
                            Sort by . . .
                        </option>
                        <option value="a-z">A-Z</option>
                        <option value="z-a">Z-A</option>
                        <option value="old to new">Old to New</option>
                        <option value="new to old">New to Old</option>
                    </select>

                    {/* Search Button */}
                    <button
                        onClick={fetchMovies}
                        style={{ marginLeft: "10px", padding: "8px 12px" }}
                    >
                        Search
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <p style={{ color: "red", textAlign: "center" }}>{error}</p>
                )}

                {/* Loading */}
                {loading && <p>Loading...</p>}

                {/* Movie List */}
                <div className="movies">
                    {movies.map((movie) => (
                        <div
                            key={movie.imdbID}
                            onClick={() => fetchMovieDetails(movie.imdbID)}
                            className="movie"
                        >
                            <img
                                src={
                                    movie.Poster !== "N/A"
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

                {/* Movie Details */}
                {selectedMovie && (
                    <div className="overlay">
                        <button
                            className="overlay__close"
                        >
                            Choose Another or Search Again
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
                    </div>
                )}
            </div>
        </section>
    );
};

export default Movies;
