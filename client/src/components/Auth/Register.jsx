import { Link } from "react-router-dom";
import React, { useCallback, useContext, useEffect } from "react";

import AuthForm from "./AuthForm";
import { AuthFormText } from "../../styling/Texts";
import { Context as UserContext } from "../../contexts/userContext";
import { PageContainer, AuthContainer } from "../../styling/Containers";

function Register() {
    const { state: { authError }, registerAction, clearAuthError } = useContext(UserContext);

    useEffect(() => {
        clearAuthError();
    }, []);

    const submitAction = useCallback(registerData => {
        registerAction(registerData);
    }, []);

    return (
        <PageContainer>
            <AuthContainer>
                <AuthForm cta="Register" action={submitAction} authError={authError} />
                <AuthFormText id="form-link">Already have an account? <Link to="/login">Login</Link></AuthFormText>
            </AuthContainer>
        </PageContainer>
    )
}

export default Register;