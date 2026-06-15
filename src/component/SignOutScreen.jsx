import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignOutScreen = () => {
    const navigate = useNavigate();
    const [countdown, setCoutdown] = useState(5);

    useEffect(() => {
        if (countdown <= 0) return;

        const countTimer = setTimeout(() => {
            setCoutdown((prev) => prev - 1);
        }, 1000);
        return () => clearTimeout(countTimer);
    }, [countdown]);

    useEffect(() => {
        const redirectTimer = setTimeout(() => {
            navigate("/signin");
        }, 5000);
        return () => clearTimeout(redirectTimer);
    }, [navigate]);

    return (
        <div id="signout" className="container">
            <h2>You have been signed out </h2>
            <p>
                Redirecting you to the sign-in screen{" "}
                <strong>{countdown}</strong> seconds . . .{" "}
            </p>
            <br />
            <button className="reg-btn" onClick={() => navigate("/signin")}>
                Go to sign-in now
            </button>
        </div>
    );
};

export default SignOutScreen;
