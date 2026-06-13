import React from "react";
import logo from "../assets/SSW-logo.jpeg";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { doSignOut } from "../firebase/auth";

const Footer = () => {
    const { user, userData, error, setError, login, register, logout } =
        useAuth();

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

    const toSignIn = () => {
        navigate("/signin");
    };

    return (
        <>
            <footer>
                <div className="container">
                    <div className="row row__column">
                        <a href="/">
                            <figure className="footer__logo">
                                <img
                                    src={logo}
                                    className="footer__logo--img no-cursor"
                                />
                            </figure>
                        </a>
                        <div className="footer__list">
                            {user ? (
                                <>
                                    <a
                                        href=""
                                        className="footer__link"
                                        onClick={handleHome}
                                    >
                                        Home
                                    </a>
                                    <a
                                        href=""
                                        className="footer__link"
                                        onClick={handleMovieSearch}
                                    >
                                        Movies
                                    </a>
                                </>
                            ) : (
                                <a
                                    href=""
                                    className="footer__link"
                                    onClick={toSignIn}
                                >
                                    Sign In
                                </a>
                            )}

                            <a className="footer__link no-cursor">About</a>
                            <a className="footer__link no-cursor">Contact</a>
                        </div>
                        <div className="footer__copyright">
                            Copyright © 2026 Silver Screen World
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
