/* eslint-disable no-case-declarations */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import { types } from './types';

const initState = {
  cuisines: [
    'African',
    'American',
    'British',
    'Cajun',
    'Caribbean',
    'Chinese',
    'Eastern European',
    'European',
    'French',
    'German',
    'Greek',
    'Indian',
    'Irish',
    'Italian',
    'Japanes',
    'Jewish',
    'Korean',
    'Latin American',
    'Mediterranean',
    'Mexican',
    'Middle Eastern',
    'Nordic',
    'Southern',
    'Spanish',
    'Thai',
    'Vietnamese',
  ],
  types: [
    'main course',
    'side dish',
    'dessert',
    'appetizer',
    'salad',
    'bread',
    'breakfast',
    'soup',
    'beverage',
    'sauce',
    'marinade',
    'fingerfood',
    'snack',
    'drink',
  ],
  ingCash: {},
  fridge: [],
};

export const reducers = (state = initState, action) => {
  switch (action.type) {
    case types.ADD_ING:
      return { ...state, ingCash: { ...state.ingCash, [action.payload.ing]: action.payload.ingData } };
    case types.ADD_TO_FRIDGE:
      return { ...state, fridge: [...state.fridge, action.payload.ingData] };
    case types.REMOVE_FROM_FRIDGE:
      const filter = state.fridge.filter((ing) => ing.id !== action.payload.id);
      return { ...state, fridge: filter };
    default:
      return state;
  }
};
