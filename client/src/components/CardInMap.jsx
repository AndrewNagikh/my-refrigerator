import React from 'react';
// import PropTypes from 'prop-types';

export default function CardInMap({ recipe }) {
  return (
    <div className="card flex-card w-100 mButtom">
      <div className="card-body d-flex align-items-center flex-column">
        <div className="m-2">
          <a href={`/meal/${recipe.id}`} className="a-style font-h2">{recipe.title}</a>
        </div>
        <div className="d-flex flex-row justify-content-around w-100">
          <div className="col-md-5">
            <img src={recipe.image} className="img-fluid rounded-start" alt="..." />
          </div>
          <div>
            {recipe.readyInMinutes}
            {' '}
            min
          </div>
          <div>
            {recipe.servings}
            {' '}
            servings
          </div>
        </div>
      </div>
    </div>
  );
}

// CardInMap.propTypes = {
//   recipe: PropTypes.object.isRequired,
// };
