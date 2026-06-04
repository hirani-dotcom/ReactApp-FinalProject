import React from "react";
import logo from "../assets/SSW-logo.jpeg";
import { useNavigate, Link } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

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
                        <Link to="/">
                            <figure className="footer__logo">
                                <img src={logo} className="footer__logo--img" />
                            </figure>
                        </Link>
                        <div className="footer__list">
                            <Link to="/" className="footer__link">
                                Home
                            </Link>
                            <Link
                                to="/movies"
                                className="footer__link"
                                onClick={handleMovieSearch}
                            >
                                Movies
                            </Link>
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
