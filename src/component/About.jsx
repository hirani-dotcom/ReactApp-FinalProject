import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const About = () => {
    const { user, userData, error, setError, login, register, logout } =
        useAuth();

    const navigate = useNavigate();

    const toMovies = () => {
        navigate("/movies");
    };

    const toSignin = () => {
        navigate("/signin");
    };

    return (
        <div id="about" className="container">
            <h1>Welcome To Silver Screen World</h1>
            <h2>
                The Ultimate Destination
                <br />
                To Search Your All-Time Favorite Movies.
            </h2>
            <div className="about__description">
                <p>
                    {" "}
                    Here you can search our extensive library of movies by
                    entering either a movie title keyword. You can then request
                    the results to be sorted alphabetically or chronologically.
                    Make your choice from those results and we will show you
                    additional details about your chosen movie.
                </p>
                <br />
            </div>
            {user ? (
                <button className="nav__link reg-btn" onClick={toMovies}>
                    {" "}
                    Search Movies
                </button>
            ) : (
                <button className="nav__link reg-btn" onClick={toSignin}>
                    {" "}
                    Sign In
                </button>
            )}
        </div>
    );
};

export default About;
