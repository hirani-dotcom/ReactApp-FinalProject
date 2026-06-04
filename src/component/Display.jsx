import React from "react";
import moviecollage from "../assets/movies-collage.jpg";

const Header = () => {
    return (
        <>
            <div>
                <header>
                    <div className="header__container">
                        <div className="header__description">
                            <h2>
                                Welcome to America's <br />
                                Most Popular Movie Platform
                            </h2>
                            <div className="movies" id="moviesContainer">
                                <img
                                    src={moviecollage}
                                    alt=""
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

export default Header;
