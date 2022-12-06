import './App.css';
import { Link } from "react-router-dom";
import React, { useState } from 'react';


// Put all the pages you want to show up on each page as a navigation bar here
function App() {

  return (
    <div>
        <h1>Foodle</h1>
          <nav>
              <Link to="/">Home</Link><span/>
              <Link to="/exploreRecipes">Explore Recipes</Link><span/>
              {sessionStorage.getItem('username') && <Link to="/profile">Profile</Link>}
              {!sessionStorage.getItem('username') && <Link to="/login">Login</Link>} <span/>
              <Link to="/reports">Reports</Link><span />
          </nav>
      </div>
  );
}

export default App;
