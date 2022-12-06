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

    const handleSubmit = () => {
        getIngredientDataReport()
        //displayReport()
    }

    React.useEffect(() => {
        const baseURL = 'http://localhost:9000/filter/rating_category'
        if (reportData == null) {
            axios.get(`${baseURL}/${ingredient}`)
            .then((response) => setReportData(response.data))
            .catch((error) => console.log(error.message))
            console.log(reportData)

        }
        
    }, [reportData]);

    const getIngredientDataReport = async () => {
        const baseURL = 'http://localhost:9000/filter/rating_category'
        
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

        console.log("41")
        console.log(reportData)
    }

    const displayReport = () => {
        console.log(reportData)
        const contactElements = [];

        //return reportData[0].name
        reportData.forEach(item => {
            contactElements.push(
                <Recipe
                recipeId={item.recipe_id}
                recipeName={item.name}
                author={item.author}
                durations={item.durations}
                servings={item.servings}
                />
            )
        });

        
        return  contactElements;
    }



    return (
        <main>
            <h1>Reports</h1>
            <button onClick={handleSubmit}>Filter by rating and category</button>
            <span> </span>

            {/* <label>Category: </label> 
            <select value={value} onChange={handleChange}>
                {options.map((option) => (
                    <option value={option.value}>{option.label}</option>
                ))}
            </select>  
            <span> </span> */}

            <label>Ingredient Name: </label> 
            <input type="text" value={ingredient} onChange={(e) => setIngredient(e.target.value)} />
        
            {/* <ul>
                { {if (reportData.length != 0) {
                    reportData.map((item,index)=>{
                        return <li key={index}>{item}</li>
                    }) }}
                }
                
            </ul> */}

            <div>
            {
                loading?'':displayReport()
            }
            </div>


        </main>
    );
}