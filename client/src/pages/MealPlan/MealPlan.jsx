/* eslint-disable no-alert */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import RecipeCard from '../../Components/RecipeCard';
import './mealPlanCSS.css';
import { keys } from '../api_keys';

function MealPlan() {
  const userId = useSelector((store) => store.user.id);
  // const apiKey = 'aa844e1894b74bc2a3e672c59f887e64';
  const [options, setOptions] = useState({ diet: '', time: '', calories: '' });
  const [recipes, setRecipes] = useState({ meals: [], nutrients: {} });
  const cangeHandler = (event) => {
    setOptions({ ...options, [event.target.name]: event.target.value });
  };
  const getRecipes = async () => {
    if (options.calories && options.diet && options.time) {
      const recipeReq = await fetch(`https://api.spoonacular.com/mealplanner/generate?timeFrame=${options.time}&targetCalories=${options.calories}&diet=${options.diet}&apiKey=${keys.apiKey3}`);
      const recipeRes = await recipeReq.json();
      console.log(recipeRes.meals);
      setRecipes({ meals: recipeRes.meals, nutrients: recipeRes.nutrients });
    } else {
      alert('Set all options');
    }
  };
  const saveMealPlan = async () => {
    if (localStorage.getItem('isAuth')) {
      const saveMealReq = await fetch('http://localhost:3100/api/v1/mealSave', {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ userId, meals: recipes.meals }),
      });
      if (saveMealReq.status === 200) {
        alert('This meal plan added to your profile');
      }
    } else {
      alert('Please, sing up if you want add meal plan to your profile');
    }
  };
  return (
    <div className="wrapper">
      <h1 className="title">Meal Planer</h1>
      <div className="options">
        <div className="select">
          <select name="diet" id="diet" onChange={cangeHandler}>
            <option selected disabled>Choose a diet</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
            <option value="Ovo-Vegetarian">Ovo-Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Pescetarian">Pescetarian</option>
            <option value="Whole30">Regular</option>
          </select>
        </div>
        <div className="select">
          <select name="time" id="time" onChange={cangeHandler}>
            <option selected disabled>Plan duration</option>
            <option value="day">day</option>
            <option value="week">week</option>
          </select>
        </div>
        <div className="calories">
          <img src="/img/calories.png" width="30" height="30" alt="..." />
          <input name="calories" placeholder="Target calories" onChange={cangeHandler} />
        </div>
      </div>
      <button className="button-cover" type="button" onClick={getRecipes}>
        <span className="text">Set All Options</span>
        <span>Get meal plan!</span>
      </button>
      {recipes.meals.length >= 1 ? (
        <button type="button" className="save-btn" onClick={saveMealPlan}>
          Did you like this plan?
          {' '}
          <span>Save It!</span>
        </button>
      ) : null}
      <div className="recipes">
        {recipes.meals.map((recipe) => <RecipeCard id={recipe.id} url={`https://spoonacular.com/recipeImages/${recipe.id}-556x370.jpg`} title={recipe.title} summary={recipe.summary} dishType="dish type" preparationMinutes={recipe.readyInMinutes} key={recipe.id} />)}
      </div>
    </div>

  );
}

export default MealPlan;
