import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddRecipe() {
    const [name, setName] = useState("");
    const [servings, setServings] = useState("");
    const [duration, setDuration] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [prices, setPrices] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [category, setCategory] = useState("Others");
    const [dietary_restriction, setDietaryRestrictions] = useState([]);
    const [preparation, setPreparation] = useState("");
    const [ingredientList, setIngredientList] = useState([])


    const submitRecipe = async () => {
        // Fill in the rest of the stuff 
        const data = {
            author: sessionStorage.getItem('username'),
            name: name,
            servings: servings,
            duration: duration,
            //prices: prices,
            cuisine: cuisine,
            category: category,
            dietary_restriction: dietary_restriction,
            preparation: preparation,
            ingredients: ingredientList

        }
        await axios.post('http://localhost:9000/addRecipe', {body:JSON.stringify(data)})
        .then(function (response) {
            console.log(response)
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
                        <h2><u>Recipe</u></h2>
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
                                    <input type="text" value={cuisine} onChange={(e) => setCuisine(e.target.value)} />
                                </label>
                                </td>                         
                            </tr>
                            <tr>
                                <td>
                                <label>
                                    Servings:<br></br>
                                    <input type="text" value={servings} onChange={(e) => setServings(e.target.value)} />
                                </label>
                                </td>
                                <td>
                                <label>
                                    Category: <br></br>                                                                        
                                    <select name="Category" onChange={(e) => setCategory(e.target.value)}>
                                    <option value="Others">Others</option>
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
                                    <option value="Dessert">Dessert</option>
                                    <option value="Snack">Snack</option>                                 
                                    </select>
                                </label> 
                                </td>
                            </tr>

                            <tr>
                                <td>
                                <label>
                                    Duration:<br></br>
                                    <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
                                </label>
                                </td>
                                <td>
                                <label>
                                    Dietary Restrictions:<br></br>
                                    <select name="Dietary Restrictions" onChange={(e) => setDietaryRestrictions(e.target.value)}>
                                    <option value="None">None</option>
                                    <option value="Gluten Free">Gluten Free</option>
                                    <option value="Vegan">Vegan</option>
                                    <option value="Vegetarian">Vegetarian</option>
                                    <option value="Dairy Free">Dairy Free</option>
                                    <option value="Others">Others</option>
                                    </select>
                                </label>
                                </td>
                            </tr>
                            <br></br>                           
                            <button class="button25" >Add Ingredient</button>
                            <label>Ingredient: 
                                <textarea className="preparationInput" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
                            </label>
                            <button class="button25" >Remove Ingredient</button>
                            <tr>
                            <td colSpan="100%">
                                <label>
                                    Preparation Steps:<br></br>
                                    <textarea className="preparationInput" value={preparation} onChange={(e) => setPreparation(e.target.value)} />
                                </label>
                            </td>
                            </tr>
                        </table>
                        <br></br>
                        <button class="button25" onClick={submitRecipe}>Create</button>
                    </form>
                    
                    
                </div>
            </div>
        </main>
    );
}