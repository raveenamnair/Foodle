import {useLocation} from 'react-router-dom';
import {useEffect, useState } from "react";
import axios from 'axios';

//https://stackoverflow.com/questions/52238637/react-router-how-to-pass-data-between-pages-in-react

export default function ExpandRecipe() {
    const [recipeData, setRecipeData] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [avgRating, setAvgRating] = useState('');

    // const selectedRecipeId = useLocation().state.recipe_id;
    const selectedRecipeId = 1;
    const getSelectedRecipeData = () => {
        axios.get(`http://localhost:9000/recipe/${selectedRecipeId}`)
            .then(response => {
                const responseRecipe = response.data[0];
                setRecipeData(responseRecipe);
                console.log(response)
            })
            .catch(error => console.error(`Error: ${error}`));
    }
    const getRecipeIngredients = () => {
        axios.get(`http://localhost:9000/recipe_ingredients/${selectedRecipeId}`)
            .then(response => {
                const responseIngredients = response.data;
                setIngredients(responseIngredients);
                console.log(response)
            })
            .catch(error => console.error(`Error: ${error}`));
    }
    const getAverageRating = () => {
        axios.get(`http://localhost:9000/avg_rating/${selectedRecipeId}`)
            .then(response => {
                const responseAvg = response.data[0];
                setAvgRating(responseAvg);
                console.log(response)
            })
            .catch(error => console.error(`Error: ${error}`));
    }

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

    // Functions that return html
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
    const summaryRating = () => {
        if (avgRating != "") {
            if (avgRating == 0) {
                return (
                    <span>No Ratings</span>
                )
            } else {
                return (
                    <><div>Average Rating</div><div>{(avgRating.avg).toFixed(1)} / 10</div></>
                )
            }
        }
    }

    useEffect(() => {
        getSelectedRecipeData();
        getRecipeIngredients();
        getAverageRating();
    }, []);


    return (
        <main>
            <div className='pageContent'>
                <div id='recipeHeader'>
                    <h1>{recipeData.name}</h1> 
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
                <div id='ratingContainer'>
                    <div id='postRating'>
                        <span>Post Rating</span>
                    </div>
                    <div id='averageRating'>
                        {summaryRating()}
                    </div>
                </div>
            </div>
        </main>
    );
}