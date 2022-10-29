import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import ExploreRecipes from "./Components/ExploreRecipes.js";
import Home from "./Components/Home.js";
import Profile from "./Components/Profile.js";
import AddRecipe from './Components/AddRecipe.js';
import EditRecipe from './Components/EditRecipe.js';
import Login from './Components/Login';
import CreateAccount from './Components/CreateAccount';

const root = ReactDOM.createRoot(document.getElementById('root'));

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
    </Routes>
  </BrowserRouter>
);