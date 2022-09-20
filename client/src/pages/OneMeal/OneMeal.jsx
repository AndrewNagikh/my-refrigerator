/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
/* eslint-disable react/prop-types */

function OneMeal() {
  const params = useParams();
  const [ThisRec, setThisRec] = useState({});
  const [Ingr, setIngr] = useState({});
  const apiKey = 'dcc7904ab8df4f84b3ec4be84eee706a';
  // const apiKey = '3f8c71044afe46a1a3cae029bb6d7832';
  // fetch запрос от сервера
  const { id } = params;
  const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
  const urlIngr = `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${apiKey}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const ThisIngr = Ingr.ingredients?.map((el) => (
    <tr>
      <td>
        { el.image !== null
          ? <img src={`https://spoonacular.com/cdn/ingredients_100x100/${el.image}`} alt="" />
          : <img src="https://spoonacular.com/cdn/equipment_100x100/slow-cooker.jpg" alt="" />}
        {' '}
        {el.name}
        {' '}
        {el.amount.metric.value}
        {' '}
        {el.amount.metric.unit}
      </td>
    </tr>
  ));

  const OneBreakfast = async () => {
    try {
      const responseIngr = await fetch(urlIngr, options);
      const response = await fetch(url, options);
      const recipeDef = await response.json();
      const recipeDefIngr = await responseIngr.json();
      const recipe = {
        id: recipeDef.id,
        title: recipeDef.title,
        timeOfCook: recipeDef.readyInMinutes,
        servings: recipeDef.servings,
        image: recipeDef.image,
        instructions: recipeDef.instructions.replace(/<\/?[^>]+(>|$)/g, ''),
        analyzedInstructions: recipeDef.analyzedInstructions,
      };

      setIngr(recipeDefIngr);
      setThisRec(recipe);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    OneBreakfast();
  }, []);

  // const [ThisIngr, setThisIngr] = useState({});
  // function removeHtmlTags(string) {
  //   return string.replace(/<\/?[^>]+(>|$)/g, '');
  // }

  return (
    <div>
      <div className="flex-card-info">
        <div>
          <div className="card-body-info">
            <div className="img-title-flex">
              <div>
                <img src={ThisRec.image} alt="..." />
              </div>

              <div className="w-100">
                <div className="title-btn">
                  <h2>{ThisRec.title}</h2>
                </div>

                <p>
                  Сooking time:
                  {' '}
                  {ThisRec.timeOfCook}
                  {' '}
                  min
                </p>
                <p>
                  Servings:
                  {' '}
                  {ThisRec.servings}
                </p>
              </div>
            </div>
            <div className="text m-2">
              {ThisRec.instructions}
            </div>
          </div>
          {ThisIngr}
        </div>
      </div>
    </div>
  );
}

export default OneMeal;
