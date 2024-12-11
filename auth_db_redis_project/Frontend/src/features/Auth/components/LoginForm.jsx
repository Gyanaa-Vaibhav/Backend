import React, {useEffect, useRef} from "react";
import '../styles/form.css'
import {Button, Input} from '../../../shared/index.js'

export default function LoginForm() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    function handelClick(e){ 
        e.preventDefault();

        const form = e.target;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        console.log(emailRef.current.value)
        console.log(passwordRef.current.value)

        fetch('http://46.202.166.211:6969/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify content type
            },

            body: JSON.stringify({
                email:emailRef.current.value,
                password:passwordRef.current.value
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => console.log(data))
            .catch((error) => console.error('Fetch error:', error));
    }

    return (
        <div
            className={"form-container"}
            onSubmit={(e)=> handelClick(e)}
        >

            <h1>Login</h1>

            <form
                id="loginForm"
            >
                <Input
                    ref={emailRef}
                    type={'email'}
                    name={'email'}
                    id={"email"}
                    placeholder={"Enter your email"}
                    required={true}
                    autoComplete={'off'}
                />

                <Input
                    ref={passwordRef}
                    type={'password'}
                    name={'password'}
                    id={'password'}
                    placeholder={"Enter your password"}
                    required={true}
                    autoComplete={'off'}
                />

                <Button
                    label="Login"
                    type="submit"
                />

                <p className="register-link">Don't have an account? <a href="/register">Register here</a></p>
            </form>
        </div>
    )
}