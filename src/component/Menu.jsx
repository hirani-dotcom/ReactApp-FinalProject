import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React, { Link } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { doSignOut } from "../firebase/auth";

const Menu = () => {
    const { user, userData, error, setError, login, register, logout } =
        useAuth();

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

    const toSignin = () => {
        navigate("/signin");
    };

    return (
        <>
            <section id="menu">
                <div className="menu--open">
                    <button
                        className="btn__menu btn__menu--close"
                        onClick={handleGoBack}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <ul className="menu__links menu__backdrop">
                        <li className="menu__list">
                            <a
                                href=""
                                className="menu__link"
                                onClick={handleToLanding}
                            >
                                Home
                            </a>
                        </li>
                        <li className="menu__list">
                            {user ? (
                                <>
                                    <a
                                        href=""
                                        className="menu__link"
                                        onClick={handleToMovies}
                                    >
                                        Movie Search
                                    </a>
                                </>
                            ) : (
                                ""
                            )}
                        </li>
                        <li className="menu__list">
                            {user ? (
                                <>
                                    <a
                                        onClick={() => {
                                            doSignOut().then(() => {
                                                toMovieSearch;
                                            });
                                        }}
                                        className=" menu__link reg-btn"
                                    >
                                        Log Out
                                    </a>
                                </>
                            ) : (
                                <>
                                    <a
                                        href=""
                                        className="menu__link"
                                        onClick={toSignin}
                                    >
                                        Sign In
                                    </a>
                                </>
                            )}
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
};

export default Menu;
