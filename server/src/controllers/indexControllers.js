// const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const fetch = require('node-fetch');

const renderTemplate = require('../../lib/renderTemplate');
const Home = require('../views/Home');

const { Favorite, FavUser } = require('../../db/models');

const renderHome = async (req, res) => {
  const newUser = req.session?.newUser;
  const userId = req.session?.userId;
  console.log('(user) id---->>>>', userId);

  const apiKey = '3f8c71044afe46a1a3cae029bb6d7832';
  // fetch запрос от сервера
  const rankMaxUsed = 1;
  const rankMinMissed = 2;
  const search = req.query?.search;
  if (search == null) {
    renderTemplate(Home, { newUser }, res);
    return
  }
  const searchStr = search.split(' ').join(',+');
  // console.log('search input', searchStr);
  try {
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchStr}&ranking=2&number=10&apiKey=${apiKey}`;
    // const url = `https://api.spoonacular.com/recipes/queries/analyze?q=eggs+with+cheese+and+with+tomato&apiKey=${api_key}`;

    const options = {
      method: 'GET',
    };
    const response = await fetch(url, options);
    const recipesDef = await response.json();

    // console.log('response ', response);
    // console.log('recipesDef ', recipesDef);

    // вынуть нужный массив и засунуть в рендер

    const recipesProm = recipesDef
      .map(async (recipe) => ({
        id: recipe.id,
        title: recipe.title,
        missedIngredients: recipe.missedIngredients,
        usedIngredients: recipe.usedIngredients,
        image: recipe.image,
        fav: false,
      }));
    const recipes = await Promise.all(recipesProm);
    // console.log('recipes ', recipes);

    renderTemplate(Home, { newUser, recipes }, res);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { renderHome };
