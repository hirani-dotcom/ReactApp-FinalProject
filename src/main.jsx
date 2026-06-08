import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
library.add({ faBars, faTimes });

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <App />   
        </BrowserRouter>
    </StrictMode>,
);
