// AuthForm.jsx
import { useState } from "react";
import { useAuth } from "../component/context/AuthContext";
import Movies from "./Movies";

export default function AuthForm() {
    const { user, userData, error, setError, login, register, logout } =
        useAuth();
    const [isRegistering, setIsRegistering] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        let success = false;

        if (isRegistering) {
            success = await register(email, password, username);
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
        setUsername("");
        setError("");
    };

    if (user) {
        return <Movies />;
    }

    return (
        <div className="authform__container">
            <h2>{isRegistering ? "Create an Account" : "Sign In"}</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                {isRegistering && (
                    <div className="authform__container--subsection">
                        <label className="authform__container--label">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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

            <p>
                {isRegistering
                    ? "Already have an account?"
                    : "Need an account?"}{" "}
                <button
                    type="button"
                    onClick={() => {
                        setIsRegistering(!isRegistering);
                        clearInputs();
                    }}
                    className="reg-btn"
                >
                    {isRegistering ? "Sign In Here" : "Register Here"}
                </button>
            </p>
        </div>
    );
}
