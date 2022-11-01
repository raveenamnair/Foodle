import React from "react";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function CreateAccount() {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [userData, setUserData] = useState([]);
    let navigate = useNavigate();


    React.useEffect(() => {
        axios.get('http://localhost:9000/user')
             .then((response) => setUserData(response.data))
             .catch((error) => console.log(error.message))
    }, []);
    
    const handleSubmit = () => {
        console.log(`${username} ${name} ${password} ${repeatPassword}`);
        userData.forEach(element => {
            if (username === element.username) {
                alert("This username already has an account related to it. Please try again.")
                setName("")
                setUsername("")
                setPassword("")
                setRepeatPassword("")
                return
            }
        })

        if (password != repeatPassword) {
            alert("Repeated Password is not the same. Please try again.");
        } else {
            // handle backend logic 
            const data = {
                username: username,
                name: name,
                password: password
            }
            axios.post('http://localhost:9000/user', {body:JSON.stringify(data)})
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            alert("New user created successfully!")
            sessionStorage.setItem("username", username)
            navigate("/")
        }
    }

    const loginNavigate = () => {
        navigate("/login")
    }

    return (
        <main>
            <h1>Create Account</h1>
            <div className="createAccountForm">
            <form>
            <label>
                Username:
                <span>&nbsp;&nbsp;</span> 
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label> <br/>
            <label>
                Name:
                <span>&nbsp;&nbsp;</span> 
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label> <br/>
            <label>
                Password:
                <span>&nbsp;&nbsp;</span> 
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label> <br/>
            <label>
                Repeat Password:
                <span>&nbsp;&nbsp;</span> 
                <input type="text" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
            </label> <br/>
            </form>
            <br/> <button onClick={handleSubmit}>Create Account</button>
            <p>Already have an account? Login Here</p> <button onClick={loginNavigate}>Login</button>
            </div>
        </main>
    );
}