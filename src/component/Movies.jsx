import React, { useState } from "react";
import noimage from "../assets/no_poster.avif";
import Nav from "./Nav";
import Footer from "./Footer";

const Movies = () => {
    // Debounce utility function
    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Async function to search movies
    async function searchMovies() {
        const query = document.getElementById("searchInput").value.trim();
        const sortOption = document.getElementById("sortOption").value;
        const moviesContainer = document.getElementById("moviesContainer");
        const loadingEl = document.getElementById("loading");

        // Clear previous results
        moviesContainer.innerHTML = "";

        // Validate input
        if (!query) {
            moviesContainer.innerHTML =
                "<p style='color: red;'> *** Please enter a movie name. ***</p>";
            return;
        }

        // Show loading indicator
        loadingEl.style.display = "block";

        try {
            // Example API: OMDb
            const response = await fetch(
                `https://www.omdbapi.com/?apikey=${"300143c"}&s=${encodeURIComponent(query)}`,
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            loadingEl.style.display = "none";

            if (data.Response === "False") {
                moviesContainer.innerHTML = `<p>${data.Error}</p>`;
                return;
            }

            let movies = data.Search;

            // Sort movies based on selected option
            movies.sort((a, b) => {
                if (sortOption === "a-z") {
                    a.Title.localeCompare(b.Title);
                } else if (sortOption === "z-a") {
                    b.Title.localeCompare(a.Title);
                } else if (sortOption === "new-old") {
                    parseInt(b.Year) - parseInt(a.Year);
                } else if (sortOption === "old-new") {
                    parseInt(a.Year) - parseInt(b.Year);
                }
            });

            movies = movies.slice(0, 6); // Limit to top 6 results

            // Display movies
            movies.slice(0, 6).forEach((movie) => {
                const movieDiv = document.createElement("div");
                movieDiv.classList.add("movie");
                movieDiv.innerHTML = `
                <img src="${movie.Poster !== "N/A" ? movie.Poster : { noimage }}" alt="${movie.Title}">
                <h4>${movie.Title}</h4>
                <p>Year: ${movie.Year}</p>
            `;
                moviesContainer.appendChild(movieDiv);
            });
        } catch (error) {
            console.error("Error fetching movies:", error);
            moviesContainer.innerHTML =
                "<p>Something went wrong. Please try again later.</p>";
        }
        // Attach debounced search to input events
        const debouncedSearch = debounce(searchMovies, 500);
        document
            .getElementById("searchInput")
            .addEventListener("input", debouncedSearch);
        document
            .getElementById("sortOption")
            .addEventListener("change", searchMovies);
    }

    const [movies, setMovies] = useState([]);

    function filterMovies(sortOption) {
        if (sortOption === "a-z") {
            setMovies(
                [...movies].sort((a, b) => a.title.localeCompare(b.title)),
            );
        } else if (sortOption === "z-a") {
            setMovies(
                [...movies].sort((a, b) => b.title.localeCompare(a.title)),
            );
        } else if (sortOption === "old-new") {
            setMovies(
                [...movies].sort((a, b) => parseInt(a.year) - parseInt(b.year)),
            );
        } else if (sortOption === "new-old") {
            setMovies(
                [...movies].sort((a, b) => parseInt(b.year) - parseInt(a.year)),
            );
        }
    }

    return (
        <>
            <section id="movies">
                <div style={{ height: "100%" }}>
                    <Nav />
                    <h1>Movie Search</h1>

                    <h2>
                        Find your
                        <span className="purple"> All-Time Favorite </span>
                        movies
                        <br />
                        with 🎬 Silver Screen World
                    </h2>
                    <div className="search-container">
                        <input
                            type="text"
                            size="25"
                            id="searchInput"
                            placeholder="Enter Name Keyword(s)"
                        />
                        <select
                            id="sortOption"
                            defaultValue="Default"
                            onChange={(e) => filterMovies(e.target.value)}
                        >
                            <option value="Default" disabled>
                                Sort by . . .
                            </option>
                            <option value="a-z">Name (A - Z)</option>
                            <option value="z-a">Name (Z - A)</option>
                            <option value="old-new"> Oldest to Newest</option>
                            <option value="new-old"> Newest to Oldest</option>
                        </select>
                        <button onChange={searchMovies()}></button>
                    </div>
                    <div
                        id="loading"
                        className="loading"
                        style={{ display: "none" }}
                    >
                        Loading...
                    </div>

                    <div className="movies" id="moviesContainer"></div>
                    <Footer />
                </div>
            </section>
        </>
    );
};

export default Movies;
