import {useNavigate} from 'react-router-dom';
import {useEffect, useState } from "react";
import axios from 'axios';

export default function ExploreRecipes() {
    const [recipeData, setRecipeData] = useState('');
    const [ingredients, setIngredients] = useState('');

    let navigate = useNavigate();
    let selectedRecipeId = 0;

    // Functions to get recipe information
    let getSelectedRecipeData = () => {
        axios.get(`/recipe/${selectedRecipeId}`)
            .then(response => {
                const responseRecipe = response.data[0];
                setRecipeData(responseRecipe);
                console.log(response)
            })
            .catch(error => console.error(`Error: ${error}`));
    }
    let getRecipeIngredients = () => {
        axios.get(`/recipe_ingredients/${selectedRecipeId}`)
            .then(response => {
                const responseIngredients = response.data;
                setIngredients(responseIngredients);
                console.log(response)
            })
            .catch(error => console.error(`Error: ${error}`));
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

    let getRecipe = () => {
        if (true) {
            selectedRecipeId++;
            return (
                <>
                <div id="recipeButtons">
                    <button>Edit Recipe</button>
                    <button onClick={getSelectedRecipeData}>Delete Recipe</button>
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

    return (
        <main>
        <h1>Explore Recipes</h1>
        <div className='pageContent'>
            {getRecipe()}
            <div id='recipeChain'>
            {getRecipes()}
                       
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