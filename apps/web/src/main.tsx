import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Providers } from "./providers";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { NewTaskModal } from "./templates";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Providers>
            <App />
            <NewTaskModal />
        </Providers>
    </React.StrictMode>
);
