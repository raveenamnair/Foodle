import { useState } from "react";
import axios from 'axios';

export default function CreateAccount() {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    
    const handleSubmit = () => {
        console.log(`${username} ${name} ${password} ${repeatPassword}`);

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
        }
    }

    return (
        <main>
            <h1>Create Account</h1>
            <div className="createAccountForm">
            <form onSubmit={handleSubmit}>
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
            <input type="submit" value="Submit" />
            </form>
            </div>
        </main>
    );
}