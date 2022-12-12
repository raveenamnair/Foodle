import React from "react";
import { useState } from "react";
import axios from 'axios';
import Recipe from "./Recipe";

export default function Reports() {
    const [value, setValue] = useState("")
    const [ingredient, setIngredient] = useState("")
    const [reportData, setReportData] = useState(null)
    const [loading, setLoading] = useState(true)

    const options = [
        { label: 'Category', value: null },
        { label: 'Breakfast', value: 'Breakfast' },
        { label: 'Lunch', value: 'Lunch' },
        { label: 'Dinner', value: 'Dinner' },
        { label: 'Snack', value: 'Snack' },
        { label: 'Dessert', value: 'Dessert' },
        { label: 'Others', value: 'Others' },
      ];

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmitIngredient = () => {
        getIngredientDataReport()
        //displayReport()
    }
    
    const handleSubmitPrice = () => {
        getPriceDataReport()
    }

    React.useEffect(() => {
        const baseURL = '/filter/rating_category'
        if (reportData == null) {
            axios.get(`${baseURL}/${ingredient}`)
            .then((response) => setReportData(response.data))
            .catch((error) => console.log(error.message))
            console.log(reportData)

        }
        
    }, [reportData]);

    const getIngredientDataReport = async () => {
        const baseURL = '/filter/rating_category'
        
        await axios.get(`${baseURL}/${ingredient}`)
        .then(function (response) {
            console.log(response.data);
            console.log('35')
            setReportData(response.data)
            console.log('37')
            setLoading(false)
        })
        .catch(function (error) {
            console.log(error);
        });
        console.log(reportData)
    }


    const getPriceDataReport = async () => {
        await axios.get(`/filter/price`)
        .then(function (response) {
            console.log("response data plz work", response.data);
            setReportData(response.data)
            setLoading(false)
        })
        .catch(function (error) {
            console.log(error);
        });
        console.log(reportData)
    }


    const displayReport = () => {
        console.log("report data:", reportData)
        const contactElements = [];

        //return reportData[0].name
        reportData.forEach(item => {
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



    return (
        <main>
            <h1>Reports</h1>
            <div className='pageContent'>
                <div className="filter_buttons">
                    <p>Filter Recipes That Don't Contain This Ingredient</p>
                    <label>Ingredient Name: </label> 
                    <input type="text" value={ingredient} onChange={(e) => setIngredient(e.target.value)} />
                    <button onClick={handleSubmitIngredient}>Filter By Ingredient</button><br />
                    <span> </span>
                    <br></br>
                    <button onClick={handleSubmitPrice}>Filter by Price Low to High</button>
                </div>
                <div>
                {
                    loading?'':displayReport()
                }
                </div>
            </div>

        </main>
    );
}