import styled from "styled-components";

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

const PageContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`;

const GalleryContainer = styled.div`
    width: 80%;
    height: 100%;
    display: flex;
    padding-top: 80px;
    align-items: center;
    margin: 0 auto 200px;
    flex-direction: column;
`;

const HeaderContainer = styled.header`
    height: 50px;
    display: flex;
    padding: 10px 25px;
    justify-content: space-between;
    box-shadow:  -2px 12px 24px -17px rgba(23, 23, 23, 0.5);
    -webkit-box-shadow:  -2px 12px 24px -17px rgba(23, 23, 23, 0.5);
`;

const AuthContainer = styled.div`
    width: 350px;
    padding: 30px;
    border-radius: 15px;
    border: 1px solid #171717;
`;

const HeaderButtonContainer = styled.div`
    width: 100%;
    display: flex;
    max-width: 230px;
    flex-direction: row;
    justify-content: space-between;
`;

const GeneralErrorContainer = styled.div`
    top: 100px;
    left: 50%;
    padding: 15px 25px;
    position: absolute;
    border-radius: 20px;
    // background-color: red;
    transform: translate(-50%, -50%);
`;

export {
    AppContainer,
    PageContainer,
    AuthContainer,
    HeaderContainer,
    GalleryContainer,
    HeaderButtonContainer,
    GeneralErrorContainer
}