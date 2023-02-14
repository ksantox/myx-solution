import styled from "styled-components";

const MainHeader = styled.h1`
    color: #4e4e4e;
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 80px;
`;

const HeaderButtonText = styled.p`
    color: #FFF;
    cursor: inherit;
    font-weight: 700;
`;

const AuthFormText = styled.p`
    text-align: center;
`;

const GeneralError = styled.p`
    color: #990000;
    font-size: 20px;
    font-weight: 700;
`;

export {
    MainHeader,
    AuthFormText,
    GeneralError,
    HeaderButtonText
}