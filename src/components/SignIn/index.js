import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {  signInUser } from './../../redux/User/user.actions';

import './styles.scss';
import Button from './../forms/Button';
import { signInWithGoogle } from './../../firebase/utils';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';


const mapState = ({ user }) => ({
  signInSuccess: user.signInSuccess
});


const SignIn = props => {
  const { signInSuccess } = useSelector(mapState);
  const dispatch = useDispatch();
  const [ email, setEmail ] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (signInSuccess) {
      resetForm();
      props.history.push("/");
    }
  }, [signInSuccess]);

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };


    const handleSubmit = e => {
        e.preventDefault()
        dispatch(signInUser({ email,password }));
    }

    
        const configAuthWrapper = {
          headline: 'Welcome Old customer'
        };

        return (
          <AuthWrapper {...configAuthWrapper}>
            <div className="formWrap">
              <form onSubmit={handleSubmit}>
                <p>Your email</p>
                <FormInput
                  type="email"
                  name="email"
                  value={email}
                  placeholder="johndoe@example.com"
                  handleChange={e => setEmail(e.target.value)}
                />

                <p>Password</p>
                <FormInput
                  type="password"
                  name="password"
                  value={password}
                  placeholder="••••••••"
                  handleChange={e => setPassword(e.target.value)}
                />

                <div className="Link">
                  <Link to="/recovery">Forgot Password?</Link>
                </div>

                <Button type="submit">Login</Button>

                <div className="socialSignIn">
                  <div className="row">
                    <Button onClick={signInWithGoogle}>
                      Sign in with Google
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </AuthWrapper>
        );
        };



export default withRouter(SignIn);
