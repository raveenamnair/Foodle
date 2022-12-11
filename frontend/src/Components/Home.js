import axios from 'axios';
import MyImage from './LandingPageImg.png';
import React from 'react';


export default function Home() {
    const a = () => {
        //sessionStorage.setItem("username", "rav");

        console.log(sessionStorage.getItem('username'))
    }


    return (
        <main>
            <h1>Home</h1>
            <img src={MyImage}  width={650} height={350} alt="cookingmama" />
        </main>
    );
}