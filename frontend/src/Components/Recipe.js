import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Recipe = ({recipeId, recipeName, author, durations, servings, cuisine, category, dietary_restriction}) => {
    let navigate = useNavigate();
    const [click, setClick] = useState(false);

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
            return Math.trunc((durations - Math.trunc(durations)) * 60)
        }  
    }

    // useEffect((recipe_id) => {
    //     expand(recipeId)
    //   }, [click]); 
    
    const onClick = () => {
        navigate(`/expandRecipe/${recipeId}`);
    };

    return (
        <div>
            <div id='recipeBlock'>
                <div className='titleHeader'>
                        <h1>{recipeName}</h1> 
                </div>
                <div className='recipeContent'>
                <div id='recipeHeader'>
                    <div className='headerDetails'>
                        <span>By: <span className='lightText'>{upperCaseFirstLetters(author)}</span></span>
                        <span>Servings: <span className='lightText'>{servings}</span></span>
                        <div>Duration: 
                            <span className='lightText'> {getHours(durations)}</span> hrs 
                            <span className='lightText'> {getMinutes(durations)}</span> mins 
                            <span className='lightText'> {getSeconds(durations)}</span> secs
                        </div>
                        <span>Cuisine: <span className='lightText'>{upperCaseFirstLetters(cuisine)}</span></span>
                        <span>Category: <span className='lightText'>{category}</span></span>
                        <span>Dietary Restriction: <span className='lightText'>{dietary_restriction}</span></span>
                
                    </div>
                </div><br/>
                <button onClick={onClick}>Expand</button>
            </div>
            </div>
            <br></br>
        </div>
    )
}

export default Recipe;