import React, { useState, useEffect } from "react";
import moviecollage from "../assets/movies-collage.jpg";
import { useAuth } from "../component/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const { user, userData, error, setError, login, register, logout } =
        useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const toMovies = () => {
        navigate("/movies");
    };

    const toSignin = () => {
        navigate("/signin");
    };

    return (
        <>
            <div>
                <header>
                    <div className="header__container">
                        <div className="header__description">
                            {user ? (
                                <>
                                    <h2>
                                        Welcome{" "}
                                        <span className="purple">
                                            {user.email}
                                        </span>{" "}
                                        <br /> to America's Most Popular Movie
                                        Platform
                                    </h2>
                                    <h3>
                                        <button
                                            className="reg-btn"
                                            onClick={toMovies}
                                        >
                                            Search Your All-Time Favorite Movies
                                            Here
                                        </button>
                                    </h3>
                                </>
                            ) : (
                                <>
                                    <h3>
                                        Please{" "}
                                        <span>
                                            <button
                                                className="reg-btn"
                                                onClick={toSignin}
                                            >
                                                {" "}
                                                Sign In{" "}
                                            </button>
                                        </span>
                                        To Access Our Extensive Library
                                    </h3>
                                </>
                            )}
                            <div className="movies" id="moviesContainer">
                                <img
                                    src={moviecollage}
                                    className="header__img--wrapper"
                                />
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </>
    );
};

export default Landing;
