import styled from "styled-components";
import { Link } from "react-router-dom";
import React, { useCallback, useContext, useRef } from "react";

import { HeaderButtonText } from "../../styling/Texts";
import { HeaderButtonContainer } from "../../styling/Buttons";
import { Context as UserContext } from "../../contexts/userContext";
import { Context as GalleryContext } from "../../contexts/galleryContext";
import { HeaderContainer, HeaderButtonContainer as ButtonContainer } from "../../styling/Containers";

function Header() {
    const fileRef = useRef(null);
    const { addImageAction } = useContext(GalleryContext);
    const { state: { token }, uploadImageAction, logoutAction } = useContext(UserContext);

    const handleUploadClick = useCallback(() => {
        fileRef.current.click();
    }, []);

    const handleImageUpload = useCallback(({ target: { files } }) => {
        uploadImageAction(files[0], url => addImageAction(url));
    }, []);

    const renderHeaderContent = useCallback(() => {
        if(token) {
            return (
                <ButtonContainer>
                    <HeaderButtonContainer onClick={handleUploadClick}>
                        <HeaderButtonText>Upload</HeaderButtonText>
                        <input ref={fileRef} type="file" hidden onChange={handleImageUpload} />
                    </HeaderButtonContainer>

                    <HeaderButtonContainer onClick={logoutAction}>
                        <HeaderButtonText>Logout</HeaderButtonText>
                    </HeaderButtonContainer>
                </ButtonContainer>
            )
        }
        

        return (
            <ButtonContainer>
                <Link to="/login">
                    <HeaderButtonContainer>
                        <HeaderButtonText>Login</HeaderButtonText>
                    </HeaderButtonContainer>
                </Link>
                
                <Link to="/register">
                    <HeaderButtonContainer>
                        <HeaderButtonText>Register</HeaderButtonText>
                    </HeaderButtonContainer>
                </Link>
            </ButtonContainer>
        )
    }, [token]);

    return (
        <HeaderContainer>
            <Link to="/">
                <Logotype>MYX Gallery</Logotype>
            </Link>
            {renderHeaderContent()}
        </HeaderContainer>
    );
}

const Logotype = styled.p`
    color: #ef7c1b;
    cursor: pointer;
    font-size: 24px;
    font-weight: 700;
`;

export default Header;