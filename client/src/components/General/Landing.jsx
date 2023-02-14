import styled from "styled-components";
import React, { useCallback, useEffect, useState } from "react";

import Gallery from "../Gallery/Gallery";
import { MainHeader } from "../../styling/Texts";
import { GalleryContainer } from "../../styling/Containers";

function Landing() {
    const [imageToView, setImageToView] = useState(null);

    useEffect(() => {
        if(imageToView) {
            document.body.style.overflow = "hidden";
        }

        return () => document.body.style.overflow = "scroll";
    }, [imageToView]);

    const handleViewImage = useCallback((imageUrl = null) => {
        setImageToView(imageUrl);
    }, []);

    return (
        <GalleryContainer>
            {imageToView && (
                <ImageViewer onClick={() => handleViewImage(null)}>
                    <FullImage src={imageToView.path} alt={imageToView.name} />
                </ImageViewer>
            )}

            <MainHeader>Welcome!</MainHeader>
            
            <Gallery onImageClick={handleViewImage} />
        </GalleryContainer>
    )
};

const ImageViewer = styled.div`
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    padding: 50px;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);
`;

const FullImage = styled.img`
    max-width: 80%;
    max-height: 80%;
    border-radius: 20px;
`;

export default Landing;
