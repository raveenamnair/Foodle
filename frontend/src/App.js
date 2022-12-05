import './App.css';
import { Link } from "react-router-dom";

// Put all the pages you want to show up on each page as a navigation bar here
function App() {
  return (
    <div>
        <h1>Foodle</h1>
          <nav>
              <Link to="/">Home</Link><br/>
              <Link to="/exploreRecipes">Explore Recipes</Link><br/>
              <Link to="/profile">Profile</Link><br/>
          </nav>
      </div>
  );
}

export default App;
