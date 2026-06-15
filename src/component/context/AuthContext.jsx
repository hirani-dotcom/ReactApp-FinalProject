// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Sync auth state and pull data from Firestore automatically
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setError(""); // Reset context error on session changes

            if (currentUser) {
                try {
                    const docRef = doc(db, "users", currentUser.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUserData(docSnap.data());
                    }
                } catch (err) {
                    console.log(
                        "Failed to synchronize user document from database.",
                    );
                }
            } else {
                setUserData(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Validation helper
    const validateInputs = (email, password, username, checkUsername) => {
        setError("");

        if (!email || !password) {
            setError("Email and password fields are required.");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please provide a valid email structure.");
            return false;
        }

        if (password.length < 6) {
            setError("Password must contain at least 6 characters.");
            return false;
        }

        if (checkUsername && (!username || !username.trim())) {
            setError("Username cannot be empty.");
            return false;
        }

        return true;
    };

    // API Handler: Registration + Firestore Write
    const register = async (email, password, username) => {
        if (!validateInputs(email, password, username, true)) return false;

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
                username,
            );
            const newUser = userCredential.user;

            const profileData = {
                username: username.trim(),
                email: email,
                createdAt: new Date().toISOString(),
            };

            await setDoc(doc(db, "users", newUser.uid), profileData);
            setUserData(profileData);
            return true;
        } catch (err) {
            setError(err.message.replace("Firebase: ", ""));
            return false;
        }
    };

    // API Handler: Sign In
    const login = async (email, password) => {
        if (!validateInputs(email, password, "", false)) return false;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            return true;
        } catch (err) {
            setError(err.message.replace("Firebase: ", ""));
            return false;
        }
    };

    // API Handler: Log Out
    const logout = async () => {
        try {
            await signOut(auth);
            return true;
        } catch (err) {
            setError("Failed to securely log out.");
            return false;
        }
    };

    const value = {
        user,
        userData,
        loading,
        error,
        setError,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

// Custom hook for seamless consumption
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(
            "useAuth must be consumed inside an AuthProvider element.",
        );
    }
    return context;
}
