import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddRecipe() {
    const [username, setUsername] = useState("");
    const [status, setStatus] = useState("");
    const [userData, setUserData] = useState([]);
    const [name, setName] = useState("");
    const [servings, setServings] = useState("");
    const [duration, setDuration] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [prices, setPrices] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [category, setCategory] = useState("");
    const [dietary_restriction, setDietaryRestrictions] = useState([]);
    
    let navigate = useNavigate();

    const baseURL = 'http://localhost:9000'

    React.useEffect(() => {
        axios.get(`http://localhost:9000/user/${username}`)
             .then((response) => setUserData(response.data))
             .catch((error) => console.log(error.message))
    }, [username]);

    const handleSubmit = async () => {
        console.log("login")
        if (username.length === 0 || name.length === 0) {
            alert("all fields not filled. Try again")
            return
        }

        //const data = {input_password: password, username: username}
    
        //await submitRecipe(data)
        //console.log(status)
        
    }

    async function submitRecipe(data) {
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
      



    return (
        <main>
            <h1>Login</h1>
            <div className="loginForm">
                <form>
                    <div>
                    <label>
                        Recipe Name:                                         
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                    </div> <br/> <br/>
                    <div>
                        <label>Category:
                            <input type="radio" value={name} onChange={(e) => setCategory(e.target.value)} />
                        </label>
                    </div> <br/> <br/>
                </form>
                <button class="button25" onClick={handleSubmit}>Login</button>
                <br></br>
                <p>Sample text</p> 
                <button class="button25" onClick={""}>Sample Button</button>
            </div>
        </main>
    );
}