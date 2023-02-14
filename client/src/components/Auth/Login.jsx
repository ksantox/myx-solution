import { Link } from "react-router-dom";
import React, { useCallback, useContext, useEffect } from "react";

import AuthForm from "./AuthForm";
import { AuthFormText } from "../../styling/Texts";
import { Context as UserContext } from "../../contexts/userContext";
import { PageContainer, AuthContainer } from "../../styling/Containers";

function Login() {
    const { state: { authError }, loginAction, clearAuthError } = useContext(UserContext);
    
    useEffect(() => {
        clearAuthError();
    }, []);

    const submitAction = useCallback(loginData => {
        loginAction(loginData);
    }, []);


    return (
        <PageContainer>
            <AuthContainer>
                <AuthForm cta="Login" action={submitAction} authError={authError} />
                <AuthFormText id="form-link">Don't have an account? <Link to="/register">Register</Link></AuthFormText>
            </AuthContainer>
        </PageContainer>
    )
}

export default Login;