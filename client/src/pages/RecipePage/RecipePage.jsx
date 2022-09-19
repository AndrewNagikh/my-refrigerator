import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RecipePage() {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState({});
  useEffect(() => {
    const getRecipeData = async () => {
      const recipeReq = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=af2df378cede4a1a96a1c5b9af315c8d`);
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
