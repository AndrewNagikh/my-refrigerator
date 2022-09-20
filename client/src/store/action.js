/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { types } from './types';

export const addIng = (ingData, ing) => ({ type: types.ADD_ING, payload: { ingData, ing } });
export const addToFridge = (ingData) => ({ type: types.ADD_TO_FRIDGE, payload: { ingData } });
export const removeFromFridge = (id) => ({ type: types.REMOVE_FROM_FRIDGE, payload: { id } });
