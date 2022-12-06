import React from "react";
import { useState } from "react";
import axios from 'axios';

export default function Reports() {
    const [value, setValue] = useState("")
    const [ingredient, setIngredient] = useState("")
    const [reportData, setReportData] = useState([])
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
        displayReport()
    }

    const getIngredientDataReport = () => {
        const baseURL = 'http://localhost:9000/filter/rating_category'
        
        axios.get(`${baseURL}/${ingredient}`)
        .then(function (response) {
            console.log(response.data);
            setReportData(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const displayReport = () => {
        
        reportData.map((item,index)=>{
            return <li key={index}>{item}</li>
        })
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
            { reportData.length === 0 ? <div>No Results</div> : displayReport() }
            </div>


        </main>
    );
}