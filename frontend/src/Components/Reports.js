import React from "react";
import { useState } from "react";

export default function Reports() {
    const [value, setValue] = useState("")
    const [rating, setRating] = useState("")
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
        alert(rating  + " " + value)
    }

    return (
        <main>
            <h1>Reports</h1>
            <button onClick={handleSubmit}>Filter by rating and category</button>
            <span> </span>

            <label>Category: </label> 
            <select value={value} onChange={handleChange}>
                {options.map((option) => (
                    <option value={option.value}>{option.label}</option>
                ))}
            </select>  
            <span> </span>

            <label>Rating: </label> 
            <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} />
        </main>
    );
}