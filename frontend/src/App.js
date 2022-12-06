import './App.css';
import { Link } from "react-router-dom";
import React, { useState } from 'react';


// Put all the pages you want to show up on each page as a navigation bar here
function App() {

  return (
    <div className='mainApp'>
        <h1>Foodle</h1>
          <ul className='customul'>
              <li className='customli'><a><Link to="/">Home</Link></a></li>
              <li className='customli'><a><Link to="/exploreRecipes">Explore Recipes</Link></a></li>
              <li className='customli'><a>{sessionStorage.getItem('username') && <Link to="/profile">Profile</Link>}
              {!sessionStorage.getItem('username') && <Link to="/login">Login</Link>} </a></li>
              <li className='customli'><a><Link to="/reports">Reports</Link></a></li>
              <br/>
              <br/>
          </ul>
      </div>
  );
}

export default App;
