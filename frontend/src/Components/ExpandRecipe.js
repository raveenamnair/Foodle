import {useNavigate} from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

export default function ExpandRecipe() {
    const [recipeData, setRecipeData] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [newIngredients, setNewIngredients] = useState('')
    const [allIngredients, setAllIngredients] = useState('')
    const [newIngredient, setNewIngredient] = useState('')
    const [avgRating, setAvgRating] = useState('')
    const [rating, setRating] = useState("")
    const [currUsername, setCurrUsername] = useState("")
    const [newRecipeData, setNewRecipeData] = useState('') 
    const [editingRecipe, setEditingRecipe] = useState(false)
    let navigate = useNavigate()

    const { recipe_id } = useParams();
    const selectedRecipeId =  recipe_id

    // Functions to get recipe information
    const getSelectedRecipeData = () => {
        axios.get(`/recipe/${selectedRecipeId}`)
            .then(response => {
                const responseRecipe = response.data[0]
                setRecipeData(responseRecipe)
            })
            .catch(error => console.error(`Error: ${error}`))
    }
    const getRecipeIngredients = () => {
        axios.get(`/recipe_ingredients/${selectedRecipeId}`)
            .then(response => {
                const responseIngredients = response.data
                setIngredients(responseIngredients)
            })
            .catch(error => console.error(`Error: ${error}`))
    }
    const getAverageRating = () => {
        axios.get(`/avg_rating/${selectedRecipeId}`)
            .then(response => {
                const responseAvg = response.data[0];
                setAvgRating(responseAvg)
            })
            .catch(error => console.error(`Error: ${error}`))
    }
    const getAllIngredients = () => {
        axios.get(`/ingredient/`)
            .then(response => {
                setAllIngredients(response.data)
            })
            .catch(error => console.error(`Error: ${error}`))
    }
    const getCurrentUser = () => {
        let username = sessionStorage.getItem('username')
        setCurrUsername(username)
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

    // Functions that return html
    const htmlUnitType = (unit_type) => {
        if (unit_type == "count") {
            return ""
        } else {
            return unit_type
        }
    }
    const ingredientList = () => {
        if (!editingRecipe && ingredients != "") {
            return (
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={ingredient.name}>
                            {ingredient.amount * ingredient.unit} {htmlUnitType(ingredient.unit_type)} {(ingredient.ingredient_name).toLowerCase()}
                        </li>
                    ))}
                </ul>
            )
        } else if (editingRecipe) {
            return (
                <ul>
                    {newIngredients.map((ingredient, index) => (
                        <li key={ingredient.name}>
                            <input className='editRecipeTextbox' type="number" value={ingredient.amount} 
                            onChange={(e) => setNewIngredients(newIngredients.map(item => 
                                item.name === ingredient.name 
                                ? {...item, amount : e.target.value} 
                                : item 
                            ))} /> * {ingredient.unit} {htmlUnitType(ingredient.unit_type)} {(ingredient.ingredient_name).toLowerCase()} 
                        &nbsp; <button onClick={() => handleRemoveIngredient(index)}>Remove</button>
                        </li>
                    ))}
                    <li key="newIngredient">
                        <input className='editRecipeTextbox' type="number" placeholder="amount"
                        onChange={(e) => setNewIngredient(existingValues => ({
                            ...existingValues,
                            amount: e.target.value,
                        }))} />
                        &nbsp; * &nbsp;
                        {allIngredients.filter(e => e.name === newIngredient.ingredient_name).length > 0 && allIngredients.filter(e => e.name === newIngredient.ingredient_name)[0].unit}
                        &nbsp;
                        {allIngredients.filter(e => e.name === newIngredient.ingredient_name).length > 0 && htmlUnitType(allIngredients.filter(e => e.name === newIngredient.ingredient_name)[0].unit_type)}
                        &nbsp;
                        <select name="Ingredient"  onChange={(e) => setNewIngredient(existingValues => ({
                            ...existingValues,
                            ingredient_name: e.target.value,
                        }))}>
                            {allIngredients.map((ingredient, index) => (
                                <>
                                    {newIngredients.filter(e => e.name === ingredient.name).length === 0 && <option value={ingredient.name}>{ingredient.name}</option>}
                                </>
                            ))}
                        </select>
                        &nbsp;
                        <button onClick={handleAddIngredient}>Add</button>
                    </li>
                </ul>
            )
        }
    }
    const summaryRating = () => {
        if (avgRating != null) {
            if (avgRating.avg == null) {
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
    const allowRating = () => {
        if (currUsername != null && currUsername != recipeData.author) {
            return (
                <>
                <span>Post Rating</span>
                <div id="enterRating">
                    <input type="number" min="1" max="10" step="1" value={rating} onChange={(e) => setRating(e.target.value)} />
                    <button onClick={handleSubmitRating}>Submit</button>
                </div>
                </>
            )
        } else {
            return (
                <></>
            )
        }
    }
    const editDeleteRecipe = () => {
        if (currUsername == recipeData.author) {
            if (editingRecipe) {
                return (
                    <>
                    <div className="titleButtons">
                        <button onClick={handleDoneEdit}>Done</button>
                    </div>
                    </>
                )
            } else {
                return (
                    <>
                    <div className="titleButtons">
                        <button onClick={handleEdit}>Edit Recipe</button>
                        <button onClick={handleDelete}>Delete Recipe</button>
                    </div>
                    </>
                )
            }
        } else {
            return (
                <></>
            )
        }
    }

    // Button handlers
    const handleSubmitRating = () => {
        if (rating < 1 || rating > 10) {
            alert("Please rate between 1 and 10")
            return
        }

        const data = {
            username: currUsername,
            recipe_id: selectedRecipeId,
            score: rating
        }

        axios.post('/rating', {body:JSON.stringify(data)})
        .then(function (response) {
            alert("Thank you for rating the recipe!")
            window.location.reload(false)
            console.log(response);
        })
        .catch(function (error) {
            if (error.response.data.error.errno == 1062) {
                alert("You've already rated this recipe")
            } else {
                alert("Please try rating again later")
            }
            console.log(error);
        })   
    }

    const handleDelete = () => {
        const data = {
            username: currUsername,
            recipe_id: selectedRecipeId
        }

        axios.post('/recipe/delete', {body:JSON.stringify(data)})
        .then(function (response) {
            navigate('/')
            console.log(response)
        })
        .catch(function (error) {
            alert("Please try rating again later")
            console.log(error)
        })   
    }

    const handleEdit = () => {
        // Safe check just to be sure
        if (recipeData.author == currUsername) {
            setEditingRecipe(true)
            setNewRecipeData(recipeData)
            setNewIngredients(ingredients)
        }
    }

    const handleDoneEdit = async () => {
        await updateRecipe()
        setEditingRecipe(false)
        setNewIngredient("")

        // Get new information
        getSelectedRecipeData()
        getRecipeIngredients()
        getAverageRating()
    }

    const handleRemoveIngredient = (index) => {
        const temp = [...newIngredients];
        temp.splice(index, 1);
        setNewIngredients(temp);
    }

    const handleAddIngredient = () => {
        if (Object.hasOwn(newIngredient, "amount") && Object.hasOwn(newIngredient, "ingredient_name")) {
            const temp = newIngredients
            let currIngredient = allIngredients.filter(e => e.name === newIngredient.ingredient_name)
            if (currIngredient.length > 0) {
                currIngredient = currIngredient[0]
            }

            newIngredient.name = currIngredient.name
            newIngredient.price = currIngredient.price
            newIngredient.recipe_id = selectedRecipeId
            newIngredient.type = currIngredient.type
            newIngredient.unit = currIngredient.unit
            newIngredient.unit_type = currIngredient.unit_type

            temp.push(newIngredient)
            setNewIngredients(temp)
            setNewIngredient("")
        } else if (!Object.hasOwn(newIngredient, "amount")) {
            alert("Please enter an amount")
        } else if (!Object.hasOwn(newIngredient, "ingredient_name")) {
            alert("Please select an ingredient")
        }
    }

    async function updateRecipe() {
        const data = {
            recipe: newRecipeData,
            recipe_ingredient: newIngredients
        }
        await axios.post('/recipe/update', {body:JSON.stringify(data)})
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error);
        })
        
    }

    useEffect(() => {
        getCurrentUser()
        getSelectedRecipeData()
        getRecipeIngredients()
        getAverageRating()
        getAllIngredients()
    }, []);


    return (
        <main>
            <div className='pageContent'>
                <div id='recipeHeader'>
                    <div className='titleHeader'>
                        {editingRecipe ?
                            <input className='editRecipeTextbox' type="text" value={newRecipeData.name} 
                            onChange={(e) => setNewRecipeData(existingValues => ({
                                ...existingValues,
                                name: e.target.value,
                              }))} />  :
                            <h1>{recipeData.name}</h1> 
                        }
                        {editDeleteRecipe()}
                    </div>
                    <div className='headerDetails'>
                        <span>By: <span className='lightText'>{upperCaseFirstLetters(recipeData.author)}</span></span>
                        <span>Servings: 
                            {editingRecipe ?
                                <input className='editRecipeTextbox' type="text" value={newRecipeData.servings} 
                                onChange={(e) => setNewRecipeData(existingValues => ({
                                    ...existingValues,
                                    servings: e.target.value,
                                  }))} /> :
                                <span className='lightText'>{recipeData.servings}</span>
                            }
                        </span>
                        <div>Duration: 
                            {editingRecipe ?
                                <><input className='editRecipeTextbox' type="number" value={newRecipeData.duration} 
                                onChange={(e) => setNewRecipeData(existingValues => ({
                                    ...existingValues,
                                    duration: e.target.value,
                                }))} /> mins
                                </> :
                                <>
                                <span className='lightText'> {getHours(recipeData.duration)}</span> hrs 
                                <span className='lightText'> {getMinutes(recipeData.duration)}</span> mins 
                                <span className='lightText'> {getSeconds(recipeData.duration)}</span> secs
                                </>
                            }
                        </div>
                        <span>Cuisine: 
                            {editingRecipe ?
                                <input className='editRecipeTextbox' type="text" value={upperCaseFirstLetters(newRecipeData.cuisine)}
                                onChange={(e) => setNewRecipeData(existingValues => ({
                                    ...existingValues,
                                    cuisine: e.target.value,
                                }))} /> :
                                <span className='lightText'>{upperCaseFirstLetters(recipeData.cuisine)}</span>
                            }
                        </span>
                        <span>Category: 
                            {editingRecipe ?
                                <select name="Category" value={newRecipeData.category} onChange={(e) => setNewRecipeData(existingValues => ({
                                        ...existingValues,
                                        category: e.target.value,
                                    }))}>
                                    <option value="Others">Others</option>
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
                                    <option value="Dessert">Dessert</option>
                                    <option value="Snack">Snack</option>                                 
                                </select> :
                                <span className='lightText'>{recipeData.category}</span>
                            }
                        </span>
                        <span>Dietary Restriction: 
                            {editingRecipe ?
                                <select name="Dietary Restrictions" value={newRecipeData.dietary_restriction} onChange={(e) => setNewRecipeData(existingValues => ({
                                        ...existingValues,
                                        dietary_restriction: e.target.value,
                                    }))}>
                                    <option value="None">None</option>
                                    <option value="Gluten Free">Gluten Free</option>
                                    <option value="Vegan">Vegan</option>
                                    <option value="Vegetarian">Vegetarian</option>
                                    <option value="Dairy Free">Dairy Free</option>
                                    <option value="Others">Others</option>
                                </select> :
                                <span className='lightText'>{recipeData.dietary_restriction}</span>
                            }
                        </span>
                    </div>
                    <div className='recipeIngredients'>
                        <h3>Ingredients:</h3>
                        {ingredientList()}
                    </div>
                    <div className='recipeContent'>
                        {editingRecipe ?
                            <textarea className="preparationInput editRecipeContent" value={newRecipeData.content} onChange={(e) => setNewRecipeData(existingValues => ({
                                ...existingValues,
                                content: e.target.value,
                            }))} />:
                            <>{recipeData.content}</>
                        }
                    </div>
                </div>
                <div id='ratingContainer'>
                    <div id='postRating'>
                        {allowRating()}
                    </div>
                    <div id='averageRating'>
                        {summaryRating()}
                    </div>
                </div>
            </div>
        </main>
    );
}