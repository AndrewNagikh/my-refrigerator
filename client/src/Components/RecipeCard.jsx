/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import './recipeCardCSS.css';

function RecipeCard({
  id, url, title, dishType, preparationMinutes,
}) {
  return (
    <div className="recipe-card">
      <figure className="card-bg-transparent">
        <Link to={`/recipe/${id}`}>
          <img src={url} alt="..." />
        </Link>
      </figure>

      <div className="card-meta">
        <p className="dish-type">{dishType}</p>

        <ul className="dish-stats">
          <li>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2C4.6875 2 2 4.6875 2 8C2 11.3125 4.6875 14 8 14C11.3125 14 14 11.3125 14 8C14 4.6875 11.3125 2 8 2Z" strokeMiterlimit="10" />
              <path d="M8 4V8.5H11" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {preparationMinutes}
            min
          </li>
          <li>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.9713 2.5C7.00005 2.5 8.00005 4.5 8.00005 4.5C8.00005 4.5 9.00005 2.5 11.0288 2.5C12.6775 2.5 13.9832 3.87937 14 5.52531C14.0344 8.94187 11.2897 11.3716 8.2813 13.4134C8.19836 13.4699 8.10036 13.5 8.00005 13.5C7.89973 13.5 7.80174 13.4699 7.7188 13.4134C4.71067 11.3716 1.96598 8.94187 2.00005 5.52531C2.01692 3.87937 3.32255 2.5 4.9713 2.5Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            237
          </li>
        </ul>
      </div>
      <h1>{title}</h1>
    </div>
  );
}

export default RecipeCard;
