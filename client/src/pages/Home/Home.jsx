import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import FormSearch from '../../components/FormSearch';
import CardInMap from '../../components/CardInMap';

export default function Home() {
  const [recipes, setReciepes] = useState([]);

  // const search = useSelector((store) => store.searchValue);

  const submitHandler = async (search) => {
    const apiKey = 'a474cb28455d46ceb257ef9e3a4a72f7';
    // const apiKey = '3f8c71044afe46a1a3cae029bb6d7832';
    console.log('search->', search);
    const searchStr = search.split(' ').join(',+');
    // const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchStr}&ranking=2&number=10&apiKey=${apiKey}`, {
    //   method: 'GET',
    // });

    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${searchStr}&addRecipeInformation=true&number=5&apiKey=${apiKey}`, {
      method: 'GET',
    });
    const recipesDef = await response.json();
    console.log('recipesDef', recipesDef);
    const recipesProm = recipesDef.results
      .map(async (recipe) => ({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings,
        fav: false,
      }));
    const rec = await Promise.all(recipesProm);
    setReciepes(rec);
    console.log(recipes);
  };

  return (
    <div className="d-flex align-items-center flex-column">
      <FormSearch submitHandler={submitHandler} id="searchForm" className="w-25 h-25 m-3 d-flex justify-content-center" />

      <div className="w-50 m-3">
        {recipes && recipes.map((recipe) => (
          <CardInMap recipe={recipe} key={recipe.id} />
        ))}
      </div>
    </div>
  );
}
