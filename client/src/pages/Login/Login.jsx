import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/action';

const initValues = {
  email: '',
  password: '',
};

const clientId = '732344056543-jeo72mj73978okpth0nr3k1mrlpl19ac.apps.googleusercontent.com';

function Login() {
  const [inputValue, setInputValue] = useState(initValues);
  const [errMessage, setErrMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSuccess = (response) => {
    // console.log('--------------------------------------', response.profileObj);
    dispatch(setUser(response.profileObj));
  };
  const onFailure = (res) => {
    setErrMessage(res.error);
  };

  const changeHandler = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const req = await fetch('http://localhost:3100/api/v1/login', {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(inputValue),
    });
    const res = await req.json();
    if (res.message) setErrMessage(res.message);
    if (res.id) {
      dispatch(setUser(res));
      navigate('/');
    }
  };

  return (
    <form onSubmit={loginHandler} id="loginForm">
      <div className="form-group">
        <label htmlFor="inputEmail2" className="form-label">
          Email
          <input onChange={changeHandler} name="email" value={inputValue.email} type="email" className="form-control" id="inputEmail2" required />
        </label>
      </div>
      <div className="form-input">
        <label htmlFor="inputPassword2" className="form-label">
          Password
          <input onChange={changeHandler} name="password" value={inputValue.password} type="password" className="form-control" id="inputPassword2" required />
        </label>
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
      <div>
        {errMessage}
      </div>
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
      {/* <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        /> */}
    </form>
  );
}

export default Login;