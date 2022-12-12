//import React from "react";
import {useNavigate} from 'react-router-dom';
import React, {useEffect, useState } from "react";
import axios from 'axios';
import Recipe from "./Recipe";

export default function ExploreRecipes() {
    let [recipeData, setRecipeData] = useState('');
    let [ingredients, setIngredients] = useState('') //('');
    const [loading, setLoading] = useState(true)
    
    let navigate = useNavigate();
    var selectedRecipeId = 1;

    // Functions to get recipe information
    let getRecipeList = () => {
        axios.get(`/list_recipes/${1}`)
            .then(response => {
                console.log("incoming");
                console.log(response);
                const responseRecipe = response.data;
                setRecipeData(responseRecipe);
                //console.log(response)
            })
            .catch(error => console.error(`Error: ${error}`));
    }

    let getRecipeIngredients = () => {
        axios.get(`/recipe_ingredients/${selectedRecipeId}`)
            .then(response => {
                const responseIngredients = response.data;
                setIngredients(responseIngredients);
                //console.log(response)
            })
            .catch(error => console.error(`Error: ${error}`));
    }
    const htmlUnitType = (unit_type) => {
        if (unit_type == "count") {
            return ""
        } else {
            return unit_type
        }
    }
    const ingredientList = () => {
        if (ingredients != "") {
            return (
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient.amount * ingredient.unit} {htmlUnitType(ingredient.unit_type)} {(ingredient.ingredient_name).toLowerCase()}</li>
                    ))}
                </ul>
            )
        }
    }

    let getRecipes = () => {
        if (true) {
            return (
                <>
                <div id='recipeBlock'>
                
                    <div id='recipeTitle'>
                        <h1>{recipeData.name}</h1> 
                        
                    </div>
                    <div className='headerDetails'>
                        <span>By: <span className='lightText'>{upperCaseFirstLetters(recipeData.author)}</span></span>
                        <span>Servings: <span className='lightText'>{recipeData.servings}</span></span>
                        <div>Duration: 
                            <span className='lightText'> {getHours(recipeData.duration)}</span> hrs 
                            <span className='lightText'> {getMinutes(recipeData.duration)}</span> mins 
                            <span className='lightText'> {getSeconds(recipeData.duration)}</span> secs
                        </div>
                        <span>Cuisine: <span className='lightText'>{upperCaseFirstLetters(recipeData.cuisine)}</span></span>
                        <span>Category: <span className='lightText'>{recipeData.category}</span></span>
                        <span>Dietary Restriction: <span className='lightText'>{recipeData.dietary_restriction}</span></span>
                    </div>
                    <div className='recipeIngredients'>
                        <h3>Ingredients:</h3>
                        {ingredientList()}
                    </div>
                    <div className='recipeContent'>
                        {recipeData.content}
                    </div>
                    
                </div>
                </>
            )
        } else {
            return (
                <></>
            )
        }
    }
    let stopLoading = () => {
        setLoading(false)
    }
    let getRecipe = () => {
        if (true) {        
            //selectedRecipeId = selectedRecipeId + 1;
            console.log("Getting recipes");  
            return (
                <>
                <div id="recipeButtons">               
                    <button onClick={stopLoading}>Get Recipes</button>
                </div>
                </>
            )
        } else {
            return (
                <></>
            )
        }
    }
    // Helper functions
    const upperCaseFirstLetters = (word) => {
        if (word != null) {
            return word.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        }
    }
    const getHours = (durationMinutes) => {
        if (durationMinutes != null) {
            return Math.trunc(durationMinutes / 60)
        }
    }
    const getMinutes = (durationMinutes) => {
        if (durationMinutes != null) {
            return Math.trunc(durationMinutes % 60)
        }
    }
    const getSeconds = (durationMinutes) => {
        if (durationMinutes != null) {
            return Math.trunc((recipeData.duration - Math.trunc(recipeData.duration)) * 60)
        }
    }
    const displayRecipes = () => {
        console.log("report data:", recipeData)
        const contactElements = [];

        //return reportData[0].name
        recipeData.forEach(item => {
            contactElements.push(
                <Recipe
                recipeId={item.recipe_id}
                recipeName={item.name}
                author={item.author}
                durations={item.duration}
                servings={item.servings}
                cuisine={item.cuisine}
                category={item.category}
                dietary_restriction={item.dietary_restriction}
                />
            )
        });

        
        return  contactElements;
    }
    useEffect(() => {
        getRecipeList()
        getRecipeIngredients()       
    }, []);

    return (
        <main>
        <h1>Explore Recipes</h1>
        <div className='pageContent'>
        {getRecipe()}

            <div id='recipeChain'>
                {
                loading?'':displayRecipes()
                }                    
            </div>

            <div id='junk'>
                <div id='postRating'>
                    
                </div>
                <div id='averageRating'>
                    
                </div>
            </div>
        </div>
    </main>
    );
}