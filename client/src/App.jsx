import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Header from "./components/common/Header";
import Gallery from "./components/Gallery/Gallery";
import Landing from "./components/General/Landing";
import { AppContainer, GeneralErrorContainer } from "./styling/Containers";

import { GeneralError } from "./styling/Texts";
import { GENERAL_ERROR_TYPES } from "./common/constants";
import { Context as UserContext } from "./contexts/userContext";
import { Context as GalleryContext } from "./contexts/galleryContext";

function App() {
    const [generalError, setGeneralError] = useState(null);
    const { state: { generalError: galleryError }, clearGeneralErrorAction: clearGalleryError } = useContext(GalleryContext);
    const { state: { token, generalError: authError }, loadUser, clearGeneralErrorAction: clearAuthError } = useContext(UserContext);
    
    useEffect(() => {
        loadUser();
    }, [])

    useEffect(() => {
        if(authError) {
            setGeneralError({ type: GENERAL_ERROR_TYPES.AUTH, message: authError });
            return;
        }

        if(galleryError) {
            setGeneralError({ type: GENERAL_ERROR_TYPES.GALLERY, message: galleryError });
            return;
        }
    }, [galleryError, authError])

    useEffect(() => {
        let errorTimeout = null;

        if(generalError) {
            errorTimeout = setTimeout(() => {
                if(generalError.type === GENERAL_ERROR_TYPES.AUTH) {
                    clearAuthError();
                }

                if(generalError.type === GENERAL_ERROR_TYPES.GALLERY) {
                    clearGalleryError();
                }

                setGeneralError("");
            }, 5000);
        }

        return () => clearTimeout(errorTimeout);
    }, [generalError]);

    return (
        <AppContainer>
            {generalError && (
                <GeneralErrorContainer>
                    <GeneralError>{generalError.message}</GeneralError>
                </GeneralErrorContainer>
            )}
            
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/">
                        <Route index element={<Landing />} />
                        <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
                        <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />
                    </Route>
                    <Route path="/gallery" element={<Gallery />} />
                </Routes>
            </BrowserRouter>
        </AppContainer>
    );
}

export default App;
