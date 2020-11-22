import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from 'react-router-dom';
import { signUpUser, resetAllAuthForms } from "./../../redux/User/user.actions";
import './styles.scss';


import AuthWrapper  from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';

const mapState= ({ user }) => ({
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError
});


const SignUp = props => {
  const { signUpSuccess, signUpError } = useSelector(mapState);
  const dispatch = useDispatch();
  const [ displayName, setDisplayName] = useState('');
  const [ email, setEmail] = useState('');
  const [ password, setPassword] = useState('');
  const [ confirmPassword, setConfirmPassword] = useState('');
  const [ errors, setErrors] = useState([]);

  useEffect(() => {
    if (signUpSuccess) {
      reset();
      dispatch(resetAllAuthForms());
      props.history.push('/');
    }
  }, [signUpSuccess]); 

    useEffect(() => {
      if (Array.isArray(signUpError) && signUpError.length > 0 ) {
        setErrors(signUpError);
      }
    }, [signUpError]); 

  const reset = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  };
  

  const handleFormSubmit = event => {
    event.preventDefault();
    dispatch(signUpUser({
      displayName,
      email,
      password,
      confirmPassword
    }));

  }



    const configAuthWrapper = {
      headline: "Hello New Customer",
    };


    return (
      <AuthWrapper {...configAuthWrapper}>
        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return <li key={index}>{err}</li>;
            })}
          </ul>
        )}

        <div classname="formWrap">
          <form onSubmit={handleFormSubmit}>
            <p>Your name</p>
            <FormInput
              type="text"
              name="displayName"
              value={displayName}
              placeholder="Knock knock, who's there?"
              handleChange={(e) => setDisplayName(e.target.value)}
            />

            <p>Your email</p>
            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="johndoe@example.com"
              handleChange={(e) => setEmail(e.target.value)}
            />

            <p>Enter your Password</p>
            <FormInput
              type="password"
              name="password"
              value={password}
              placeholder="••••••••"
              handleChange={(e) => setPassword(e.target.value)}
            />

            <p>Confirm Password</p>
            <FormInput
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="••••••••"
              handleChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button type="submit">Sign up</Button>
          </form>
        </div>
      </AuthWrapper>
    );
}

export default withRouter(SignUp);
