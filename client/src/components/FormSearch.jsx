/* eslint-disable prefer-rest-params */
import React from 'react';
import PropTypes from 'prop-types';
import './formSearch.css';

export default function FormSearch({ submitHandler }) {
  // const [searchValue, setSearchValue] = useState('');
  // const dispatch = useDispatch();

  let changeSearchHandler = (e) => {
    submitHandler(e.target.value);
  };

  //------------------------------------------------------------------------
  const debounce = (fn, ms) => {
    let timeout;
    return function () {
      const fnCall = () => { fn.apply(this, arguments); };
      clearTimeout(timeout);
      timeout = setTimeout(fnCall, ms);
    };
  };
  changeSearchHandler = debounce(changeSearchHandler, 1000);

  return (
    <div>
      <div>
        <form id="searchForm">
          <input name="search" type="text" className="w-100 start-50 form-control m10" id="exampleInput1" onChange={changeSearchHandler} placeholder="start to find" />
        </form>
      </div>
    </div>
  );
}

FormSearch.propTypes = {
  submitHandler: PropTypes.func.isRequired,
};
