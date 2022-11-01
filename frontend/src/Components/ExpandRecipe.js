import {useLocation} from 'react-router-dom';
import {useEffect, useState } from "react";
import axios from 'axios';

//https://stackoverflow.com/questions/52238637/react-router-how-to-pass-data-between-pages-in-react

export default function ExpandRecipe() {
    const [recipeData, setRecipeData] = useState('');

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

    const makeNewLine = (sentence) => {
        if (sentence != null) {
            return sentence.replace(/(?:\r\n|\r|\n)/g, ' <br/> ');
        }
    }

    useEffect(() => {
        getSelectedRecipeData();
    }, []);


    return (
        <main>
            <div className='pageContent'>
                <div id='recipeHeader'>
                    <h1>{recipeData.name}</h1> 
                    <div className='headerDetails'>
                        <span>By: <span className='boldText'>{upperCaseFirstLetters(recipeData.author)}</span></span>
                        <span>Servings: <span className='boldText'>{recipeData.servings}</span></span>
                        <div>Duration: 
                            <span className='boldText'> {getHours(recipeData.duration)}</span> hrs 
                            <span className='boldText'> {getMinutes(recipeData.duration)}</span> mins 
                            <span className='boldText'> {getSeconds(recipeData.duration)}</span> secs
                        </div>
                        <span>Cuisine: <span className='boldText'>{upperCaseFirstLetters(recipeData.cuisine)}</span></span>
                        <span>Category: <span className='boldText'>{recipeData.category}</span></span>
                        <span>Dietary Restriction: <span className='boldText'>{recipeData.dietary_restriction}</span></span>
                    </div>
                    <div className='recipeIngredients'>
                        <h3>Ingredients:</h3>
                    </div>
                    <div className='recipeContent'>
                        {recipeData.content}
                    </div>
                </div>
            </div>
        </main>
    );
}