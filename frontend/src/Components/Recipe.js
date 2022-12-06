
import React from 'react';



const Recipe = ({recipeId, recipeName, author, durations, servings}) => {

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

    return (
        <div>
            {/* <p>{recipeName}</p>
            <p>{author}</p>
            <p>{durations}</p>
            <p>{servings}</p> */} 
            <div className='pageContent'>
                <div id='recipeHeader'>
                    <div className='titleHeader'>
                        <h1>{recipeName}</h1> 
                    </div>
                    <div className='headerDetails'>
                        <span>By: <span className='lightText'>{upperCaseFirstLetters(author)}</span></span>
                        <span>Servings: <span className='lightText'>{servings}</span></span>
                        <div>Duration: 
                            <span className='lightText'> {getHours(durations)}</span> hrs 
                            <span className='lightText'> {getMinutes(durations)}</span> mins 
                            <span className='lightText'> {getSeconds(durations)}</span> secs
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Recipe;