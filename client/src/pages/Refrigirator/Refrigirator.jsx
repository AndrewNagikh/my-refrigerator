/* eslint-disable func-names */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addIng } from '../../store/action';
import Ingridient from '../../Components/Ingridient';
import Loader from '../../Components/Loader';
import './refCss.css';
import RecipeCard from '../../Components/RecipeCard';

function Refrigirator() {
  const dispath = useDispatch();
  const [ingridientsValue, setingridientsValue] = useState({ ingridient: '' });
  const [ingridients, setIngridients] = useState({ isLoad: false, ingridients: [] });
  const [recipes, setRecipes] = useState([]);
  const ingCash = useSelector((store) => store.ingCash);
  const fridge = useSelector((store) => store.fridge);
  //------------------------------------------------------------------------
  let handleChange = (event) => {
    setingridientsValue({ ...ingridientsValue, [event.target.name]: event.target.value });
  };
  //------------------------------------------------------------------------
  const debounce = (fn, ms) => {
    let timeout;
    return function () {
      const fnCall = () => { fn.apply(this, arguments); };
      clearTimeout(timeout);
      timeout = setTimeout(fnCall, ms);
    };
  };
  handleChange = debounce(handleChange, 1000);
  //------------------------------------------------------------------------
  //------------------------------------------------------------------------
  useEffect(() => {
    const getIngridients = async () => {
      if (ingridientsValue.ingridient) {
        if (ingCash[ingridientsValue.ingridient]) {
          setIngridients({ isLoad: true, ingridients: ingCash[ingridientsValue.ingridient] });
        } else {
          const ingridientsReq = await fetch(`https://api.spoonacular.com/food/ingredients/search?query=${ingridientsValue.ingridient}&apiKey=af2df378cede4a1a96a1c5b9af315c8d`);
          const ingridientRes = await ingridientsReq.json();
          dispath(addIng(ingridientRes.results, ingridientsValue.ingridient));
          setIngridients({ isLoad: true, ingridients: ingridientRes.results });
        }
      }
    };
    getIngridients();
  }, [ingridientsValue]);
  useEffect(() => {
    const getIngNames = () => {
      const namesArr = fridge.map((ing) => ing.name);
      return namesArr.join(',');
    };
    const getRecipes = async () => {
      if (fridge.length >= 1) {
        const recipesReq = await fetch(`https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${getIngNames()}&sortDirection=desc&addRecipeInformation=true&number=10&apiKey=af2df378cede4a1a96a1c5b9af315c8d`);
        const recipesRes = await recipesReq.json();
        setRecipes(recipesRes.results);
        console.log(recipes);
      }
    };
    getRecipes();
  }, [fridge]);
  //------------------------------------------------------------------------
  return (
    <div className="wrapper">
      <div className="ref-container">
        <div className="my-ref col-md-6 col-sm-6 col-6">
          <h4 className="title"> What is in my fridge?</h4>
          <div className="friedge">
            {fridge.map((ingridient) => <Ingridient ingData={ingridient} isAdd={ingridient.isAdd} key={ingridient.id} />)}
          </div>
        </div>
        <div className="ingridients col-md-6 col-sm-6 col-6">
          <h4 className="title">Here you can search and add ingridients to fridge</h4>
          <div className="col-md-6">
            <input
              name="ingridient"
              type="text"
              className="form-control mb-3"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={handleChange}
            />
          </div>
          <div className="ingridients-list">
            {
                ingridients.isLoad ? (
                  ingridients.ingridients.map((ingridient) => <Ingridient ingData={ingridient} key={ingridient.id} />)
                )
                  : <Loader />
            }
          </div>
        </div>
      </div>
      <div className="recipes col-md-12">
        <h4 className="title">Get the recipes</h4>
        <div className="recipes">
          {recipes.map((recipe) => <RecipeCard id={recipe.id} url={recipe.image} title={recipe.title} summary={recipe.summary} dishType={recipe.dishTypes.at(0)} preparationMinutes={recipe.readyInMinutes} key={recipe.id} />)}
        </div>
      </div>
    </div>
  );
}

export default Refrigirator;
