import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { useDispatch } from 'react-redux';

export default function Form({ submitHandler, btnTitle }) {
  const [inputValue, setInputValues] = useState({ login: '', password: '' });

  const changeLoginHandler = (e) => {
    setInputValues({ ...inputValue, login: e.target.value });
  };

  const changePasHandler = (e) => {
    setInputValues({ ...inputValue, password: e.target.value });
  };

  return (
    <div>
      <div>
        <form
          id="loginForm"
          onSubmit={(e) => {
            e.preventDefault();
            submitHandler(inputValue);
          }}
        >
          <input name="login" type="text" className="form-control m-2" onChange={changeLoginHandler} value={inputValue.login} id="exampleInput1" placeholder="login" />
          <input name="password" type="password" className="form-control m-2" id="exampleInput2" onChange={changePasHandler} value={inputValue.password} placeholder="password" />
          <button type="submit" className="btn btn-warning">{btnTitle}</button>
        </form>
      </div>
    </div>
  );
}

Form.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  btnTitle: PropTypes.string.isRequired,
};
