import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RecipePage() {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState({});
  useEffect(() => {
    const getRecipeData = async () => {
      const recipeReq = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=dcc7904ab8df4f84b3ec4be84eee706a`);
      const recipeRes = await recipeReq.json();
      setRecipeData(recipeRes);
    };
    getRecipeData();
  }, []);
  console.log(recipeData);
  return (
    <div>RecipePage</div>
  );
}

export default RecipePage;
