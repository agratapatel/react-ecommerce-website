import React, { useState } from 'react';
import './styles.scss';

import { auth, handleUserProfile } from './../../firebase/utils';

import AuthWrapper  from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';



const SignUp = props => {
  const [ displayName, setDisplayName] = useState('');
  const [ email, setEmail] = useState('');
  const [ password, setPassword] = useState('');
  const [ confirmPassword, setConfirmPassword] = useState('');
  const [ errors, setErrors] = useState([]);

  const reset = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  };
  

  const handleFormSubmit = async event => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      const err = ['Password doesn\'t match'];
      setErrors(err);
      return;
    }

    if (password.length < 6) {
        const err = ["Password should be more than 6 characters"];
        setErrors(err);
        return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await handleUserProfile(user, { displayName });

     reset();

    } catch (err) {
      console.log(err);
    }
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

export default SignUp;
