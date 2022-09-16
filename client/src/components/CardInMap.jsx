import React from 'react';
// import PropTypes from 'prop-types';

export default function CardInMap({ recipe }) {
  return (
    <div className="card flex-card w-100 mButtom">
      <div className="card-body d-flex align-items-center flex-column" key={recipe.id}>
        <div className="m-2">
          <a href={`/breakfast/${recipe.id}`} className="a-style font-h2">{recipe.title}</a>
        </div>
        <div className="d-flex flex-row justify-content-around w-100">
          <div className="col-md-5">
            <img src={recipe.image} className="img-fluid rounded-start" alt="..." />
          </div>
          <div>
            missedIngredients:
            {' '}
            {recipe.missedIngredients?.map((ingredient) => (
              <ul key={ingredient.id}>
                <li>
                  {ingredient.name}
                </li>
              </ul>
            ))}
          </div>
          <div>
            usedIngredients:
            {' '}
            {recipe.usedIngredients?.map((ingredient) => (
              <ul key={ingredient.id}>
                <li>
                  {ingredient.name}
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// CardInMap.propTypes = {
//   recipe: PropTypes.object.isRequired,
// };
