import styled from "styled-components";
import React, { useCallback, useState } from "react";
import { AuthButton, AuthButtonText } from "../../styling/Buttons";

function AuthForm({ cta, action, authError }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleAction = useCallback(() => {
        const submitData = { email, password };
        action(submitData);
    }, [email, password, action]);

    return (
        <FormContainer>
            <InputGroup>
                <Label htmlFor="email">Email</Label>
                <Input type="text" id="email" name="email" value={email} onChange={({ target: { value } }) => setEmail(value)} />
            </InputGroup>
            <InputGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password" value={password} onChange={({ target: { value } }) => setPassword(value)} />
            </InputGroup>
            
            {authError && <FormError>{authError}</FormError> }

            <AuthButton onClick={handleAction}>
                <AuthButtonText>{cta}</AuthButtonText>
            </AuthButton>
        </FormContainer>
    );
};

const FormContainer = styled.div`
    display: flex;
    position: relative;
    margin-bottom: 30px;
    flex-direction: column;
`;
    
const InputGroup = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 25px;
    flex-direction: column;
`;

const Label = styled.label`
    font-size: 14px;
    margin-bottom: 5px;
`;

const Input = styled.input`
    height: 35px;
    outline: none;
    padding-left: 10px;
    border-radius: 10px;
    border: 1px solid #171717;
`;

const FormError = styled.div`
    color: red;
    top: -15px;
    left: 50%;
    min-width: 200px;
    transform: translate(-50%, -50%);
    font-size: 12px;
    font-weight: 700;
    position: absolute;
    text-align: center;
`;

export default AuthForm;