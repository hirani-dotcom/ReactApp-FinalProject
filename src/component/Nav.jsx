import React, { useState } from "react";
import logo from "../assets/SSW-logo.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { doSignOut } from "../firebase/auth";

const Nav = () => {
    const { user, userData, error, setError, login, register, logout } =
        useAuth();

    const navigate = useNavigate();

    const toHome = () => {
        navigate("/");
    };

    const toMenuClick = () => {
        navigate("/menu");
    };

    const toMovieSearch = () => {
        navigate("/movies");
    };

    const toSignin = () => {
        navigate("/signin");
    };

    return (
        <section id="landing">
            <nav>
                <div className="nav__container">
                    <img className="logo" src={logo} alt="" />
                    <ul className="nav__links">
                        <li>
                            <a href="" className="nav__link" onClick={toHome}>
                                {user ? "Home" : null}
                            </a>
                        </li>
                        <li>
                            <a
                                href=""
                                className="nav__link"
                                onClick={toMovieSearch}
                            >
                                {user ? "Movies Search" : null}
                            </a>
                        </li>
                        <li>
                            {user ? (
                                <>
                                    <a
                                        alt="Log Out"
                                        onClick={() => {
                                            doSignOut().then(() => {
                                                toSignin;
                                            });
                                        }}
                                        className="nav__link reg-btn"
                                    >
                                        {user.email[0].toUpperCase()}
                                    </a>
                                </>
                            ) : (
                                <>
                                    <a
                                        href=""
                                        className="nav__link reg-btn"
                                        onClick={toSignin}
                                    >
                                        Sign In
                                    </a>
                                </>
                            )}
                        </li>
                        <button
                            className="btn__menu menu--open"
                            onClick={toMenuClick}
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
