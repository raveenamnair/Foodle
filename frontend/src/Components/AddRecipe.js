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
            <div className='pageContent'>
            <h1>Create a recipe</h1>
            <h2>Fill out the necessary information to upload your recipe</h2>
                <div className="recipeContent">
                    <form className="recipeForm">
                        <table>
                            <tr>
                                <td>
                                <label>
                                    Recipe Name:  <br></br>                                     
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                </label>
                                </td>
                                <td>
                                <label>
                                    Cuisine:<br></br>
                                    <input type="text" value={name} onChange={(e) => setCategory(e.target.value)} />
                                </label>
                                </td>                         
                            </tr>
                            <tr>
                                <td>
                                <label>
                                    Servings:<br></br>
                                    <input type="text" value={name} onChange={(e) => setCategory(e.target.value)} />
                                </label>
                                </td>
                                <td>
                                <label>
                                    Category: <br></br>                                                                        
                                    <select name="Category" onChange={(e) => setName(e.target.value)}>
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="mercedes">Mercedes</option>
                                    <option value="audi">Audi</option>
                                    </select>
                                </label> 
                                </td>
                            </tr>

                            <tr>
                                <td>
                                <label>
                                    Duration:<br></br>
                                    <input type="text" value={name} onChange={(e) => setCategory(e.target.value)} />
                                </label>
                                </td>
                                <td>
                                <label>
                                    Dietary Restrictions:<br></br>
                                    <select name="Dietary Restrictions" onChange={(e) => setDietaryRestrictions(e.target.value)}>
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="mercedes">Mercedes</option>
                                    <option value="audi">Audi</option>
                                    </select>
                                </label>
                                </td>
                            </tr>
                        </table>
                        <br></br>
                        <button class="button25" onClick={handleSubmit}>Login</button>
                    </form>
                    
                    <br></br>
                    <p>Sample text</p> 
                    <button class="button25" onClick={""}>Sample Button</button>
                </div>
            </div>
        </main>
    );
}