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

        console.log(userData[0].password.data)

        
        let res = await axios.post(`${baseURL}/check/password`, {
            actualPassword: userData[0].password, 
            typedPassword: password
        })
        // .then((response) => setStatus(response))
        // .catch((error) => console.log(error.message))
        
        console.log(res)
        var d = res.data.replace(/[^\x00-\x7F]/g, "");
        console.log(res.data)
        var y = decodeString(res.data)
        console.log("Decoded jsonString: ", y);
        console.log(res.data.length)
       // var x = JSON.parse(res)
       // console.log(x)
        console.log(password.length)

        // if ( == password.trim()) {
        //     console.log("same")
        // } else {
        //     console.log("diff")
        // }
        // console.log(res.data.trim())
        // console.log(password)
        // if (res.data.trim() == password) {
        //     console.log("same")
        // } else {
        //     console.log("diff")
        // }

        // const response = await fetch(`${baseURL}/check/password`, {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         actualPassword: userData[0].password, 
        //          typedPassword: password
        //     }),
        //     headers: {
        //       // when i added this the cors error went away?
        //       'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     contentType: 'application/json',

        //   });
        //   console.log(response)
    }

    const decodeString = (str) => {
        return str.replace(/\\u[\dA-F]{4}/gi, (unicode) => {
                return String.fromCharCode(parseInt(unicode.replace(/\\u/g, ""), 16));
            });
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
                <button onClick={handleLogin}>Login</button>
                <br></br>
                <p>Not registered? Create an account</p> 
                <button onClick={createAccount}>Create Account</button>
            </div>
        </main>
    );
}