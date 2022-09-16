import { searchActionsTypes } from './types';

export const sendSearchValue = (searchValue) => ({
  type: searchActionsTypes.SEND_SEARCH_VALUE, payload: { searchValue },
});
