/* eslint-disable max-len */
import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeCard from '../../Components/RecipeCard';

function Types() {
  const { type } = useParams();
  const [recipes, setRecipes] = useState({ isLoad: false, recipesList: [] });
  useEffect(() => {
    const getRecipes = async () => {
      const recipesReq = await fetch(`https://api.spoonacular.com/recipes/complexSearch?type=${type}&number=50&addRecipeInformation=true&apiKey=0affb3ba41434bc6ad794365c333f0fb`);
      const recipesRes = await recipesReq.json();
      setRecipes({ isLoad: true, recipesList: recipesRes.results });
    };
    getRecipes();
  }, [type]);
  return (
    <div className="wrapper">
      <h1 className="title">
        {type}
        {' '}
        recipes
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

export default Types;
