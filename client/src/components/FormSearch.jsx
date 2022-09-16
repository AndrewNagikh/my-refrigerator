import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// import { sendSearchValue } from '../store/action';

export default function FormSearch({ submitHandler }) {
  const [searchValue, setSearchValue] = useState('');
  // const dispatch = useDispatch();

  const changeSearchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <div>
        <form
          id="searchForm"
          onSubmit={(e) => {
            e.preventDefault();
            // dispatch(sendSearchValue(searchValue));
            submitHandler(searchValue);
          }}
        >
          <input name="search" type="text" className="w-75 start-50 form-control m-1" id="exampleInput1" onChange={changeSearchHandler} value={searchValue} placeholder="start to find" />
          <button id="getMeal" type="submit" className="btn btn-warning w-25 m-1">Search</button>
        </form>
      </div>
    </div>
  );
}

FormSearch.propTypes = {
  submitHandler: PropTypes.func.isRequired,
};
