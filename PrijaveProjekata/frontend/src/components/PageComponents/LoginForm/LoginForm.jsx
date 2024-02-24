import React from "react";
import styles from './LoginForm.css'
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useLogin } from "../../../hooks/useLogin";

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        await login(username, password)
    }

    return (
        <div className={styles.loginScreenContainer}>
            <h1>Log in</h1>
            <form className={styles.loginForm} onSubmit={handleSubmit} >
                <label htmlFor="username">Username</label>
                <input 
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    >
                </input>

                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    placeholder="Password" 
                    name="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    >
                </input>
                <button disabled={isLoading} type="submit" className={styles.button}> Login </button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}

export default LoginForm