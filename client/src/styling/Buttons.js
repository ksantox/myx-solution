import styled from "styled-components";

const MAIN_COLOR = "#ef7c1b";

const AuthButton = styled.div`
    width: 120px;
    height: 35px;
    display: flex;
    margin: 0 auto;
    cursor: pointer;
    align-items: center;
    border-radius: 5px;
    justify-content: center;
    background-color: ${MAIN_COLOR}
`;

const AuthButtonText = styled.p`
    color: #FFF;
    cursor: inherit;
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;
`;

const HeaderButtonContainer = styled.div`
    width: 100px;
    height: 30px;
    display: flex;
    cursor: pointer;
    padding: 10px 15px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    background-color: ${MAIN_COLOR};
`;

export {
    AuthButton,
    AuthButtonText,
    HeaderButtonContainer
}