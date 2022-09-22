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
  useEffect(() => {
    const getIngridients = async () => {
      if (ingridientsValue.ingridient) {
        if (ingCash[ingridientsValue.ingridient]) {
          setIngridients({ isLoad: true, ingridients: ingCash[ingridientsValue.ingridient] });
        } else {
          const ingridientsReq = await fetch(`https://api.spoonacular.com/food/ingredients/search?query=${ingridientsValue.ingridient}&apiKey=337ec7d8808c4c8a8c29b18a585b6352`);
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
        const recipesReq = await fetch(`https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${getIngNames()}&sortDirection=desc&addRecipeInformation=true&number=10&apiKey=337ec7d8808c4c8a8c29b18a585b6352`);
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
          <div className="col-md-6 ing mb-4">
            <span className="search_icon">
              <svg width="40px" height="40px" viewBox="0 0 32 32">
                <g id="search" stroke="none" strokeWidth="1" fill="none">
                  <path d="M11.7143965,18.9346534 C10.6394787,17.5741754 9.99787012,15.8555424 9.99787012,13.9870537 C9.99787012,9.57592573 13.5737958,6 17.9849238,6 C22.3960517,6 25.9719774,9.57592573 25.9719774,13.9870537 C25.9719774,18.3981816 22.3960517,21.9741073 17.9849238,21.9741073 C16.3097918,21.9741073 14.7551052,21.4584191 13.4709582,20.5771365 L9.42051366,24.9958033 C8.94961659,25.5095092 8.15143818,25.5442126 7.63773228,25.0733155 C7.61400259,25.0515633 7.59111399,25.028911 7.56911673,25.0054082 C7.05009837,24.4508689 7.06442523,23.5846247 7.60149781,23.0475521 L11.7143965,18.9346534 Z M17.9849238,19.9741073 C21.2914822,19.9741073 23.9719774,17.2936121 23.9719774,13.9870537 C23.9719774,10.6804952 21.2914822,8 17.9849238,8 C14.6783653,8 11.9978701,10.6804952 11.9978701,13.9870537 C11.9978701,17.2936121 14.6783653,19.9741073 17.9849238,19.9741073 Z" id="Combined-Shape" fill="#2F2F36" fillRule="nonzero" />
                </g>
              </svg>
            </span>
            <input
              name="ingridient"
              type="text"
              className="ing_input"
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
      <h2 className="title">Get the recipes</h2>
      <h3>{recipes.length > 0 ? '10 recipes sorted by quantity of ingredients' : 'Here would be 10 recipes sorted by quantity of ingredients'}</h3>
      <div className="recipes col-md-12">
        <div className="recipes">
          {recipes.map((recipe) => <RecipeCard id={recipe.id} url={recipe.image} title={recipe.title} summary={recipe.summary} dishType={recipe.dishTypes.at(0)} preparationMinutes={recipe.readyInMinutes} key={recipe.id} />)}
        </div>
      </div>
    </div>
  );
}

export default Refrigirator;
