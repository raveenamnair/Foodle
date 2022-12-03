import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";
import {decode as base64_decode, encode as base64_encode} from 'base-64';



export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState([]);
    const [status, setStatus] = useState("");
    let navigate = useNavigate();

    const baseURL = 'http://localhost:9000'

    React.useEffect(() => {
        axios.get(`http://localhost:9000/user/${username}`)
             .then((response) => setUserData(response.data))
             .catch((error) => console.log(error.message))
    }, [username]);

    const handleLogin = async () => {
        console.log("login")
        if (username.length === 0 || password.length === 0) {
            alert("all fields not filled. Try again")
            return
        }

        // const response = await loginUser({input_password: password, username: username});
        // console.log("status: " + status)
        const data = {input_password: password, username: username}
    
        await loginUser(data)
        console.log(status)
        
    }

    async function loginUser(data) {
        await axios.post('/check_password', {body:JSON.stringify(data)})
        .then(function (response) {
            if (response.data[0][0].result == 1) {
                sessionStorage.setItem("username", username)
                navigate('/')
            } else {
                alert('incorrect login')
            }
            console.log();
            setStatus(response.data[0][0].result)
        })
        .catch(function (error) {
            console.log(error);
        })
        
    }
      

    
    const createAccount = () => {
        navigate()
    }

    return (
        <main>
            <h1>Login</h1>
            <div className="loginForm">
                <form>
                    <label>
                        Username:
                        <span>&nbsp;&nbsp;</span> 
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label> <br/> <br/>
                    <label>
                        Password:
                        <span>&nbsp;&nbsp;</span> 
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label> <br/> <br/>
                </form>
                <button class="button25" onClick={handleLogin}>Login</button>
                <br></br>
                <p>Not registered? Create an account</p> 
                <button class="button25" onClick={createAccount}>Create Account</button>
            </div>
        </main>
    );
}