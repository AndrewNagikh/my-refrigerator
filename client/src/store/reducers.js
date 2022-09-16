/* eslint-disable consistent-return */
/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import { searchActionsTypes } from './types';

const initState = {
  searchValue: '',

};

export const reducers = (state = initState, action) => {
  switch (action.type) {
    case searchActionsTypes.SEND_SEARCH_VALUE:
      return { ...state, searchValue: action.payload.searchValue };

    default:
      return state;
  }
};
