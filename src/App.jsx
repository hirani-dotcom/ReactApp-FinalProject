import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./component/Nav";
import About from "./component/About";
import Menu from "./component/Menu";
import Movies from "./component/Movies";
import Footer from "./component/Footer";
import SignOutScreen from "./component/SignOutScreen";
import AuthForm from "./component/AuthForm";

const App = () => {
    return (
        <div>
            <Nav />
            <Routes>
                <Route path="/ReactApp-FinalProject/" element={<About />} />
                <Route path="/about" element={<About />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/Signin" element={<AuthForm />} />
                <Route path="/signout" element={<SignOutScreen />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
