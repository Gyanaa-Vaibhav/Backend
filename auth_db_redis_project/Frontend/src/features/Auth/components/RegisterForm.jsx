import React, {useRef} from "react";
import '../styles/form.css'
import {Button, Input} from '../../../shared/index.js'

export default  function RegisterForm(){
    const emailRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    return (
        <div className="form-container">
            <h1>Register</h1>

            <form>
                <Input
                    ref={usernameRef}
                    type={'text'}
                    name={'username'}
                    id={"username"}
                    placeholder={"Enter your username"}
                    required={true}
                    autoComplete={'off'}
                />

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
                    id={"password"}
                    placeholder={"Enter your password"}
                    required={true}
                    autoComplete={'off'}
                />

                <Input
                    ref={confirmPasswordRef}
                    type={'password'}
                    name={'confirm_password'}
                    id={"confirm_password"}
                    placeholder={"Confirm your password"}
                    required={true}
                    autoComplete={'off'}
                />

                <Button
                    label="Register"
                    type="submit"
                    // onClick={(e)=> handelClick(e)}
                />
            </form>
        </div>

    )
}