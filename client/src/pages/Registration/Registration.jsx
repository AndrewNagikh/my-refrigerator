import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/action';

const initValues = {
  login: '',
  email: '',
  password: '',
  imageUrl: '',
};

const clientId = '732344056543-jeo72mj73978okpth0nr3k1mrlpl19ac.apps.googleusercontent.com';

function Registration() {
  const [inputValue, setInputValue] = useState(initValues);
  const [errMessage, setErrMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSuccess = async (res) => {
    const req = await fetch('http://localhost:3100/api/v1/google', {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(res.profileObj),
    });
    const response = await req.json();
    // console.log(res);
    // if (res.message) setErrMessage(res.message);
    if (response.isSuccess) {
      dispatch(setUser(res.profileObj));
      navigate('/');
    }
    // console.log('-------------------', res.profileObj);
    // dispatch(setUser(res.profileObj));
  };
  const onFailure = (res) => {
    setErrMessage(res.error);
  };

  const changeHandler = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const regHandler = async (e) => {
    e.preventDefault();
    const req = await fetch('http://localhost:3100/api/v1/registration', {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(inputValue),
    });
    const res = await req.json();
    // console.log(res);
    if (res.message) setErrMessage(res.message);
    if (res.id) {
      dispatch(setUser(res));
      navigate('/');
    }
  };

  return (
    <div className="center">
      <form onSubmit={regHandler} className="form-signin" id="regForm">
        <div className="form-group">
          <label htmlFor="inputLogin" className="form-label">
            Login
            <input onChange={changeHandler} name="login" value={inputValue.login} type="text" className="form-control" id="inputLogin" required />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail" className="form-label">
            Email
            <input onChange={changeHandler} name="email" value={inputValue.email} type="email" className="form-control" id="inputEmail" required />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword" className="form-label">
            Password
            <input onChange={changeHandler} name="password" value={inputValue.password} type="password" className="form-control" id="inputPassword" required />
          </label>
        </div>
        <button type="submit" className="btn btn-lg btn-primary btn-block">Register</button>
        {/* <div>
          Привет
          {state.user.login}
          <button onClick={() => logoutHandler(inputValue)} type="button"
          className="btn btn-primary">Выйти</button>
        </div> */}
        <div>
          {errMessage}
        </div>
      </form>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        // eslint-disable-next-line react/jsx-curly-brace-presence
        cookiePolicy={'single_host_origin'}
        // eslint-disable-next-line react/jsx-boolean-value
        isSignedIn={true}
      />
      {/* <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      /> */}
    </div>
  );
}

export default Registration;
