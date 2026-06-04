import React from "react";
import "./App.css";
import Nav from "./component/Nav";
import Display from "./component/Display";
import Footer from "./component/Footer";

const App = () => {
    return (
        <>
            <div>
                    <Nav />
                    <Display />
                    <Footer />
            </div>
        </>
    );
};

export default App;
