import ReactDOM from 'react-dom/client';
import React from 'react';
import './index.css';
import App from './App';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import axios from 'axios';
import ExploreRecipes from "./Components/ExploreRecipes.js";
import Home from "./Components/Home.js";
import Profile from "./Components/Profile.js";
import AddRecipe from './Components/AddRecipe.js';
import EditRecipe from './Components/EditRecipe.js';
import Login from './Components/Login';
import CreateAccount from './Components/CreateAccount';
import ExpandRecipe from './Components/ExpandRecipe';
import NavBar from './Components/Navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL = process.env.REACT_APP_BE_URL;

/* Register all pages here. This has nothing to do with navigation bar, just the existence of the page. */
root.render(
  <BrowserRouter>
    <App />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exploreRecipes" element={<ExploreRecipes />} />
        <Route path="/addRecipe" element={<AddRecipe />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editRecipe" element={<EditRecipe />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/expandRecipe" element={<ExpandRecipe />} />
        {/* <Route path="/navbar" element={<NavBar />} /> */}
    </Routes>
  </BrowserRouter>
);