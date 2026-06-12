import React from "react";
import logo from "../assets/SSW-logo.jpeg";
import { useNavigate, Link } from "react-router-dom";

const Footer = () => {
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

    return (
        <>
            <footer>
                <div className="container">
                    <div className="row row__column">
                        <a href="/">
                            <figure className="footer__logo">
                                <img src={logo} className="footer__logo--img no-cursor" />
                            </figure>
                        </a>
                        <div className="footer__list">
                            <a href="" className="footer__link" onClick={handleHome}>
                                Home
                            </a>
                            <a href=""
                                className="footer__link"
                                onClick={handleMovieSearch}
                            >
                                Movies
                            </a>
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
