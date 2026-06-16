import { useState } from "react";
import { useAuth } from "../component/context/AuthContext";
import Movies from "./Movies";
import { useNavigate } from "react-router-dom";

export default function AuthForm() {
    const { user, userData, error, setError, login, register, logout } =
        useAuth();
    const [isRegistering, setIsRegistering] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const navigate = useNavigate();

    const toMovies = () => {
        navigate("/movies");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let success = false;

        if (isRegistering) {
            success = await register(email, password, name);
        } else {
            success = await login(email, password);
        }

        if (success) {
            clearInputs();
        }
    };

    const clearInputs = () => {
        setEmail("");
        setPassword("");
        setError("");
    };

    if (user) {
        return <Movies />;
    }

    return (
        <div id="signin" className="authform__container">
            <h2 className="purple">{isRegistering ? "Create an Account" : "Sign In"}</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                {isRegistering && (
                    <div className="authform__container--subsection">
                        <label className="authform__container--label">
                            Username
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="authform__container--input"
                        />
                    </div>
                )}

                <div className="authform__container--subsection">
                    <label className="authform__container--label">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="authform__container--input"
                    />
                </div>

                <div className="authform__container--subsection">
                    <label className="authform__container--label">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="authform__container--input"
                    />
                </div>

                <button type="submit" className="reg-btn">
                    {isRegistering ? "Register" : "Sign In"}
                </button>
            </form>

            <p className="toggle__container">
                {isRegistering
                    ? "Already have an account?"
                    : "Need an account?"}{" "}
                <a
                    onClick={() => {
                        setIsRegistering(!isRegistering);
                        clearInputs();
                    }}
                    className="reg-sign__toggle"
                >
                    {isRegistering ? "Sign In Here" : "Register Here"}
                </a>
            </p>
        </div>
    );
}
