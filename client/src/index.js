import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { Provider as UserProvider } from "./contexts/userContext";
import { Provider as GalleryProvider } from "./contexts/galleryContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <GalleryProvider>
            <UserProvider>
                <App />
            </UserProvider>
        </GalleryProvider>
    </React.StrictMode>
);
