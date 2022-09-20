/* eslint-disable max-len */
import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeCard from '../../Components/RecipeCard';
import './cousinesCSS.css';

function Cousines() {
  const { cuisine } = useParams();
  const [recipes, setRecipes] = useState({ isLoad: false, recipesList: [] });
  useEffect(() => {
    const getRecipes = async () => {
      const recipesReq = await fetch(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine.toLowerCase()}&number=50&addRecipeInformation=true&apiKey=af2df378cede4a1a96a1c5b9af315c8d`);
      const recipesRes = await recipesReq.json();
      setRecipes({ isLoad: true, recipesList: recipesRes.results });
      console.log(recipesRes);
    };
    getRecipes();
  }, [cuisine]);
  return (
    <div className="wrapper">
      <h1 className="title">
        {cuisine}
        {' '}
        cuisine
      </h1>
      <div className="recipeList">
        {recipes.isLoad
          ? recipes.recipesList.map((recipe) => <RecipeCard id={recipe.id} url={recipe.image} title={recipe.title} summary={recipe.summary} dishType={recipe.dishTypes.at(0)} preparationMinutes={recipe.readyInMinutes} key={recipe.id} />)
          : (
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
      </div>
    </div>
  );
}

export default Cousines;
