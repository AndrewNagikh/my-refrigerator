import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from './Form';

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState(undefined);

  const submitHandler = async (userdata) => {
    const response = await fetch('http://localhost:3100/api/v1/signup', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userdata),
    });

    if (response.status === 500) {
      setError('server error');
    }
    const result = await response.json();
    // console.log(result);

    if (response.status === 200) {
      navigate('/game'); // , { replace: true }
    }

    if (response.status === 400) {
      setError(result.message);
    }
  };

  return (
    <div>
      <h3>Sign Up</h3>
      <Form submitHandler={submitHandler} btnTitle="Sign Up" />
      {error && <p className="error">{error}</p>}
      <Link to="/signin">Sign In</Link>
    </div>
  );
}
