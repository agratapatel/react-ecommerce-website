import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import Button from './../forms/Button';
import { signInWithGoogle, auth } from './../../firebase/utils';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';




const SignIn = props => {

  const [ email, setEmail ] = useState('');
  const [password, setPassword] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };


    const handleSubmit = async e => {
        e.preventDefault()


        try {

            await auth.signInWithEmailAndPassword(email,password);
            resetForm();

        } catch (err) {
            //console.log(err);
        }
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



export default SignIn;
