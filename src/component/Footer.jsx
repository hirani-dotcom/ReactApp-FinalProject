import React from "react";
import logo from "../assets/SSW-logo.jpeg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const Footer = () => {
    const { user, userData, error, setError, login, register, logout } =
        useAuth();

    const navigate = useNavigate();

    const toAbout = () => {
        navigate("/about");
    };

    const handleMenuClick = () => {
        navigate("/menu");
    };

    const toMovies = () => {
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
                        <a>
                            <figure className="footer__logo">
                                <img src={logo} className="footer__logo--img" />
                            </figure>
                        </a>
                        <div className="footer__list">
                            {user ? (
                                <>
                                    <a
                                        className="footer__link"
                                        onClick={toMovies}
                                    >
                                        Movies
                                    </a>
                                </>
                            ) : (
                                <a className="footer__link" onClick={toSignIn}>
                                    Sign In
                                </a>
                            )}

                            <a className="footer__link" onClick={toAbout}>
                                About
                            </a>
                            <a className="footer__link no-cursor">Contact</a>
                            <a className="footer__link no-cursor">Legal</a>
                            <a className="footer__link no-cursor">Disclaimer</a>
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
