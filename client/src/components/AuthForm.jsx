import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

function AuthForm() {

    const { signup, login, errMsg, resetAuthErr } = useContext(UserContext)

    const [isUser, setIsUser] = useState(false)

    const [input, setInput] = useState({
        username: '',
        password: ''
    })

    const handleUserToggle = () => {
        resetAuthErr()
        setIsUser(prev => !prev)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        isUser ? login(input) : signup(input)
    }



    return (
        <>
            <form onSubmit={handleSubmit} id='auth-form'>
                <input
                    className="auth-inputs"
                    name="username"
                    value={input.username}
                    onChange={handleChange}
                    placeholder="User Name"
                    type="text"
                />
                <input
                    className="auth-inputs"
                    name="password"
                    value={input.password}
                    onChange={handleChange}
                    placeholder="Password"
                    type="password"
                />
                <button>{isUser ? 'Log In' : 'Sign Up'}</button>
                <button onClick={handleUserToggle}>{isUser ? 'Need to Sign Up?' : 'Need to Log In?'}</button>
                <p>{errMsg}</p>
            </form>
            
        </>
    );
}

export default AuthForm;