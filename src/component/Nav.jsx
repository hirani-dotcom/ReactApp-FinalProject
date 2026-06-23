import React, { useState } from "react";
import logo from "../assets/SSW-logo.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { doSignOut } from "../firebase/firebase";

const Nav = () => {
    const { user, userData, error, setError, login, register, logout } =
        useAuth();

    const navigate = useNavigate();

    const toAbout = () => {
        navigate("/about");
    };

    const toMenu = () => {
        navigate("/menu");
    };

    const toMovies = () => {
        navigate("/movies");
    };

    const toSignin = () => {
        navigate("/signin");
    };

    const toSignout = () => {
        navigate("/signout");
    };

    return (
        <nav>
            <div className="nav__container">
                <img className="logo" src={logo} alt="" />
                <ul className="nav__links">
                    <li>
                        {user ? (
                            <>
                                <button
                                    className="nav__link reg-btn"
                                    onClick={toMovies}
                                >
                                    {" "}
                                    Search Movies
                                </button>
                            </>
                        ) : (
                            <>
                                {" "}
                                <p> </p>{" "}
                            </>
                        )}
                    </li>
                    <li>
                        <a className="nav__link reg-btn" onClick={toAbout}>
                            About
                        </a>
                    </li>
                    <li>
                        {user ? (
                            <>
                                {" "}
                                <button
                                    onClick={() => {
                                        doSignOut();
                                        navigate("/signout");
                                    }}
                                    className="nav__link reg-btn logout"
                                >
                                    {" "}
                                    {user.email[0].toUpperCase()}{" "}
                                    <span className="logout-text">
                                        Log Out
                                    </span>{" "}
                                </button>{" "}
                            </>
                        ) : (
                            <>
                                <button
                                    className="nav__link reg-btn"
                                    onClick={toSignin}
                                >
                                    Sign In
                                </button>
                            </>
                        )}
                    </li>
                    <button className="btn__menu menu--open" onClick={toMenu}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </ul>
            </div>
        </nav>
    );
};

export default Nav;
