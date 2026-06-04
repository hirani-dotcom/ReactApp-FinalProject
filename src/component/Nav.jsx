import React, { useState } from "react";
import logo from "../assets/SSW-logo.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate();

    const handleMenuClick = () => {
        navigate("/menu");
    };

    const handleMovieSearch = () => {
        navigate("/movies");
    };

    return (
        <>
            <section id="landing">
                <nav>
                    <div className="nav__container">
                        <img className="logo" src={logo} alt="" />
                        <ul className="nav__links">
                            <li>
                                <Link to="/" className="nav__link">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/movies"
                                    className="nav__link"
                                    onClick={handleMovieSearch}
                                >
                                    Movie Search
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/"
                                    className="nav__link nav__link--primary no-cursor"
                                >
                                    Contact
                                </Link>
                            </li>
                            <button
                                className="btn__menu menu--open"
                                onClick={handleMenuClick}
                            >
                                <FontAwesomeIcon icon={faBars} />
                            </button>
                        </ul>
                    </div>
                </nav>
            </section>
        </>
    );
};

export default Nav;
