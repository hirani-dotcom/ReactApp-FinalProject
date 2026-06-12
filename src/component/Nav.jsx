import React, { useState } from "react";
import logo from "../assets/SSW-logo.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate();

    const handleHome = () => {
        navigate("/");
    };

    const handleMenuClick = () => {
        navigate("/menu");
    };

    const handleMovieSearch = () => {
        navigate("/movies");
    };

    const handleSignin = () => {
        navigate("/signin");
    }

    return (
        <section id="landing">
            <nav>
                <div className="nav__container">
                    <img className="logo" src={logo} alt="" />
                    <ul className="nav__links">
                        <li>
                            <a href="" className="nav__link" onClick={handleHome}>
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href=""
                                className="nav__link"
                                onClick={handleMovieSearch}
                            >
                                Movie Search
                            </a>
                        </li>
                        <li>
                            <a
                                href=""
                                className="nav__link nav__link--primary" onClick={handleSignin}
                            >
                                Sign In/Up
                            </a>
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
    );
};

export default Nav;
