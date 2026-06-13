import React, { useState } from "react";
import AuthForm from "./AuthForm";
import { useAuth } from "./context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
    const { user, userData, error, setError, login, register, logout } =
        useAuth();

    const navigate = useNavigate();

    const toMovies = () => {
        navigate("/movies");
    };

    const [isModalOpen, setIsModalOpen] = useState(true);

    return (
        <>
            <div>
                <section id="signin">
                    <div className="signin">
                        {user ? (
                            <Link to="/movies">
                                {" "}
                                <h1>Welcome</h1>
                                <h2>Click Here To Search Your Movies</h2>{" "}
                            </Link>
                        ) : (
                            <>
                                <AuthForm />
                            </>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
};

export default SignIn;
