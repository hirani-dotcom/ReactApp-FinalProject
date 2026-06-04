import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useNavigate } from "react-router-dom";

const Menu = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        try {
            navigate(-1); // Navigate back to the previous page (home page)
        } catch (error) {
            console.error("Navigation error:", error);
        }
    };
    const handleToLanding = () => {
        navigate({ pathname: "/" });
    };
    const handleToMovies = () => {
        navigate({ pathname: "/movies" });
    };
    return (
        <>
            <section id="menu" className="menu--open">
                <div>
                    <button
                        className="btn__menu btn__menu--close"
                        onClick={handleGoBack}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <ul className="menu__links">
                        <li className="menu__list">
                            <Link
                                to="/"
                                className="menu__link"
                                onClick={handleToLanding}
                            >
                                Home
                            </Link>
                        </li>
                        <li className="menu__list">
                            <Link
                                to="/movies"
                                className="menu__link"
                                onClick={handleToMovies}
                            >
                                Movie Search
                            </Link>
                        </li>
                        <li className="menu__list">
                            <a className="menu__link no-cursor">Contacts</a>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
};

export default Menu;
