import {useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import axios from 'axios';


export default function Profile() {
    const [name, setName] = useState("") 
    const [currUsername, setCurrUsername] = useState("")
    const [userStat, setUserStat] = useState("")
    let tempCurrUsername = null     //useful in functions on useEffect
    let navigate = useNavigate()

    // Functions to run at the start of the page
    const getCurrentUser = () => {
        // TODO CHANGE
        // let username = sessionStorage.getItem('username')
        let username = "testing"
        setCurrUsername(username)
        tempCurrUsername = username
    }
    const checkLogin = () => {
        if (tempCurrUsername == null) {
            navigate("/Login");
        }
    }
    const getUser = () => {
        if (tempCurrUsername != null) {
            axios.get(`/user/${tempCurrUsername}`)
            .then(response => {
                setName(response.data[0].name)
                console.log(response)
            })
            .catch(error => console.error(`Error: ${error}`));
        }
    }
    const getUserStat = () => {
        axios.get(`/user/stats/"${tempCurrUsername}"`)
            .then(response => {
                setUserStat(response.data[response.data.length - 2][0])
                console.log(response)
            })
            .catch(error => console.error(`Error: ${error}`));
    }

    // Helper functions
    const upperCaseFirstLetters = (word) => {
        if (word != null) {
            return word.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        }
    }

    // Functions that return html
    const htmlCheckNA = (check_null) => {
        if (check_null == null) {
            return "N/A"
        } else {
            return check_null
        }
    }

    // Button handlers
    const handleLogout = () => {
        sessionStorage.setItem("username", null)
        navigate("/")
    }

    useEffect(() => {
        getCurrentUser()
        checkLogin()
        getUser()
        getUserStat()
    }, []);


    return (
        <main>
            <div className="titleHeader">
                <h1>{upperCaseFirstLetters(name)}</h1>
                <div className='titleButtons'>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div>
                <span>User Statistics:</span><br></br>
                <span><b>Number of Recipes Posted: </b>{userStat.recipe_posted}</span><br></br>
                <span><b>Number of Ratings Posted: </b>{userStat.rating_posted}</span><br></br>
                <span><b>Average Rating Score of Posted Recipes: </b>{htmlCheckNA(userStat.avg_recipe_rating)}</span><br></br>
                <span><b>Most Expensive Recipe Posted: </b>{htmlCheckNA(userStat.most_expensive_recipe)}</span><br></br>
            </div>
        </main>
    );
}