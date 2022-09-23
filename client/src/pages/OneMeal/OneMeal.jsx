/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import { useParams, Link } from 'react-router-dom';
import Loader from '../../Components/Loader';
import './OneMeal.css';
import Favorite from '../../Components/favorite/Favorite';
/* eslint-disable react/prop-types */

function OneMeal() {
  const params = useParams();
  const [ThisRec, setThisRec] = useState({});
  const [Ingr, setIngr] = useState({});

  const [Nutr, setNutr] = useState({});
  const [Sim, setSim] = useState(0);
  const [Equ, setEqu] = useState({});

  const [Load, setLoad] = useState(false);

  const [BNutr, setBNutr] = useState(false);
  const [BEqu, setBEqu] = useState(false);

  const apiKey = '8958ed8f6c484d13a2a65ea80376f7f9'; // Ключ Антона
  // const apiKey = 'eb668d0ba9a74900b0d10015bd11fd21'; // Запасной ключ
  // fetch запрос от сервера
  const { id } = params;
  const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
  const urlIngr = `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${apiKey}`;
  const urlNutr = `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${apiKey}`;
  const urlSim = `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${apiKey}`;
  const urlEqu = `https://api.spoonacular.com/recipes/${id}/equipmentWidget.json?apiKey=${apiKey}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const ThisIngr = Ingr.ingredients?.map((el) => (
    <td>
      {el.image !== null && el.image !== 'no.jpg' && el.image !== 'no.png'
        ? <img src={`https://spoonacular.com/cdn/ingredients_100x100/${el.image}`} className="this" alt="" />
        : <img src="https://playbcm.net/uploads/monthly_2019_06/1.png.52e7dbf919d58285dee3e0a89177c676.png" className="ingImg this" alt="" />}
      <div className="ourname">
        {el.name}
        {' '}
      </div>
      {' '}
      {el.amount.metric.unit !== ''
        ? (
          <div className="ourname">
            {el.amount.metric.value}
            {' '}
            {el.amount.metric.unit}
          </div>
        )
        : (
          <div className="ourname">
            {el.amount.metric.value}
            {' item'}
          </div>
        )}
    </td>
  ));

  const ThisEqu = Equ.equipment?.map((el) => (
    <td>
      <div className="eqname">
        {el.name}
        {' '}
      </div>
      {el.image !== null && el.image !== 'no.png' && el.image !== 'no.jpg'
        ? <img src={`https://spoonacular.com/cdn/equipment_100x100/${el.image}`} alt="" />
        : <img src="https://playbcm.net/uploads/monthly_2019_06/1.png.52e7dbf919d58285dee3e0a89177c676.png" className="ingImg" alt="" />}
    </td>
  ));

  const OneBreakfast = async () => {
    try {
      const responseIngr = await fetch(urlIngr, options);
      const response = await fetch(url, options);
      const responseSim = await fetch(urlSim, options);
      const responseNutr = await fetch(urlNutr, options);
      const responseEqu = await fetch(urlEqu, options);

      const recipeDef = await response.json();
      const recipeDefIngr = await responseIngr.json();
      const recipeSim = await responseSim.json();
      const recipeNutr = await responseNutr.json();
      const recipeEqu = await responseEqu.json();
      const recipe = {
        id: recipeDef.id,
        title: recipeDef.title,
        timeOfCook: recipeDef.readyInMinutes,
        servings: recipeDef.servings,
        image: recipeDef.image,
        instructions: recipeDef.instructions?.replace(/<\/?[^>]+(>|$)/g, ''),
        analyzedInstructions: recipeDef.analyzedInstructions,
      };

      const ThisNutr = {
        calories: recipeNutr.calories,
        carbs: recipeNutr.carbs,
        fat: recipeNutr.carbs,
        protein: recipeNutr.protein,
      };
      const newId = recipeSim[0].id;
      console.log(recipe);
      setNutr(ThisNutr);
      setSim(newId);
      setThisRec(recipe);

      setEqu(recipeEqu);
      setIngr(recipeDefIngr);
      setLoad(true);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    OneBreakfast();
  }, []);

  useEffect(() => {
    OneBreakfast();
  }, [id]);

  return (
    Load
      ? (
        <div className="full">
          <div className="card mb-3" width="540px;">
            <div className="row g-0">
              <div className="col-md-4 align-self-center">
                <img src={ThisRec.image} className="img-fluid rounded-start mainImg" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">{ThisRec.title}</h5>
                    <div>
                      <Favorite id={id} className="svg-big" />
                    </div>
                  </div>
                  <p className="card-text">{ThisRec.instructions}</p>
                  <p className="card-text">
                    Сooking time:
                    {' '}
                    {ThisRec.timeOfCook}
                    {' '}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Servings:
                      {' '}
                      {ThisRec.servings}
                    </small>
                  </p>
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between flex-wrap">
                        {ThisIngr}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="baton d-flex justify-content-between">
            <td>
              <button type="button" onClick={() => { setBNutr(true); setBEqu(false); }} className="btn btn-info nutrition">Calories</button>
            </td>
            <td>
              <button type="button" onClick={() => { setBNutr(false); setBEqu(true); }} className="btn btn-info equipment">Equipment</button>
            </td>
            <td>
              <Link to={`/recipe/${Sim}`}>
                <button type="button" onClick={() => { setLoad(false); setBNutr(false); setBEqu(false); }} className="btn btn-info taste" textDecoration="none">Similar</button>
              </Link>
            </td>
          </div>
          <div className="extra">
            {BNutr
              ? (
                <div className="card">
                  <div className="card-body">
                    Calories:
                    {' '}
                    {Nutr.calories}
                  </div>
                  <div className="card-body">
                    Carbs:
                    {' '}
                    {Nutr.carbs}
                  </div>
                  <div className="card-body">
                    Fat:
                    {' '}
                    {Nutr.fat}
                  </div>
                  <div className="card-body">
                    Protein:
                    {' '}
                    {Nutr.protein}
                  </div>
                </div>
              )
              : <div />}
            {BEqu
              ? (
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">{ThisEqu}</p>
                  </div>
                </div>
              )
              : <div />}
          </div>
        </div>
      )
      : <Loader />

  );
}

export default OneMeal;
