import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./component/Nav";
import Landing from "./component/Landing";
import Menu from "./component/Menu";
import Movies from "./component/Movies";
import Footer from "./component/Footer";
import SignIn from "./component/SignIn";

const App = () => {
    return (
        <div>
            <Nav />
            <Routes>
                <Route path="/" exact element={<Landing />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/Signin" element={<SignIn />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
