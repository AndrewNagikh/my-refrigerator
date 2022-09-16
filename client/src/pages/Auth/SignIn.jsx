import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Form from './Form';
import { setSignIn } from '../../../store/actions/userActions';

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(undefined);

  const submitHandler = async (userdata) => {
    const response = await fetch('http://localhost:3100/api/v1/signin', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userdata),
    });

    // console.log(response.message);

    if (response.status === 500) {
      setError('server error');
    }
    const result = await response.json();
    // console.log('result', result);

    if (response.status === 200) {
      dispatch(setSignIn({ isReqSended: true, ...result.user }));
      navigate('/game'); // , { replace: true }
    }

    if (response.status === 400) {
      setError(result.message);
    }
  };

  return (
    <div>
      <h3>Sign In</h3>
      <Form submitHandler={submitHandler} btnTitle="Sign In" />
      {error && <p className="error">{error}</p>}
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}
