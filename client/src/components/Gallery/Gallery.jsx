import styled from "styled-components";
import { FaHeart, FaTrash } from "react-icons/fa";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";

import { IMAGE_STEP_COUNT } from "../../common/constants";
import { Context as UserContext } from "../../contexts/userContext";
import { Context as GalleryContext } from "../../contexts/galleryContext";

function Gallery({ onImageClick }) {
    const observerRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [imagesViewed, setImagesViewed] = useState(0);
    const { state: { user, staredImages }, starImage, unstarImage, deleteImage } = useContext(UserContext);
    const { state: { images, didReachEnd }, loadMoreImages, removeImageAction } = useContext(GalleryContext);

    useEffect(() => {
        setIsLoading(true);
        loadMoreImages(imagesViewed, () => setIsLoading(false));
    }, [imagesViewed]);

    const lastElementRef = useCallback(lastImage => {
        if(isLoading) {
            return;
        }

        if(observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && !didReachEnd) {
                setImagesViewed(prevImagesViewed => prevImagesViewed + IMAGE_STEP_COUNT);
            }
        }, { threshold: 1.0 });

        if(lastImage) {
            observerRef.current.observe(lastImage);
        }
        
    }, [isLoading, didReachEnd]);

    const handleStarImage = useCallback(id => {
        if(staredImages[id]) {
            unstarImage(id);
            return;
        }

        starImage(id);
    }, [staredImages]);

    const handleDeleteImage = useCallback(id => {
        deleteImage(id, removeImageAction);
    }, [staredImages]);


    const renderImages = useCallback(() => {
        if(!images.length) {
            return (
                <NoImagesText>No images found</NoImagesText>
            );
        }

        const imagesToRender = [];

        for (let i = 0; i < images.length; i++) {
            const currImage = images[i];

            const imageElement = (
                <ImageContainer ref={images.length - 1 === i ? lastElementRef : null} key={currImage._id}>
                    <Image onClick={() => onImageClick(currImage)} style={{ backgroundImage: `url(${currImage.thumbPath})` }} />

                    {currImage.user === user._id && (
                        <ImageControls>
                            <FavContainer onClick={() => handleStarImage(currImage._id)}>
                                {staredImages[currImage._id] ? <FaHeart color="#ef7c1b" /> : <FaHeart color="#ccc" /> }
                            </FavContainer>

                            <DeleteContainer onClick={() => handleDeleteImage(currImage._id)}>
                                <FaTrash color="#ccc" />
                            </DeleteContainer>
                            
                        </ImageControls>
                    )}
                </ImageContainer>
            );

            imagesToRender.push(imageElement);
        }

        return imagesToRender;
    }, [images, staredImages, user]);

    return (
        <GalleryContainer>
            {renderImages()}
        </GalleryContainer>
    )
};

const GalleryContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const ImageContainer = styled.div`
    margin: 20px;
`;

const Image = styled.div`
    width: 250px;
    height: 250px;
    cursor: pointer;
    border-radius: 15px;
    margin-bottom: 20px;
    background-size: cover;
`;

const ImageControls = styled.div`
    display: flex;
    justify-content: space-between;
`;

const FavContainer = styled.div`
    cursor: pointer;
    font-size: 24px;
`;

const DeleteContainer = styled.div`
    cursor: pointer;
    font-size: 24px;
`;

const NoImagesText = styled.p`
    color: #e4e4e4;
    font-size: 120px;
    font-weight: 700;
    text-transform: uppercase;
`;

export default Gallery;
