import React, { Component } from 'react';
import './styles.scss';
import Button from './../forms/Button';
import { signInWithGoogle, auth } from './../../firebase/utils';

import FormInput from './../forms/FormInput';



const initialState = {
    email: '',
    password: ''
};


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        };

        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { email, password } = this.state;

        try {

            await auth.signInWithEmailAndPassword(email,password);
            this.setState({
                ...initialState
            });

        } catch (err) {
            //console.log(err);
        }
    }

    render () {
        const { email, password } = this.state;


        return (
          <div className="signin">
            <div className="wrap">
              <h2>Hey Old Customer</h2>

              <div className="formWrap">
                <form onSubmit={this.handleSubmit}>
                  <p>Your email</p>
                  <FormInput
                    type="email"
                    name="email"
                    value={email}
                    placeholder="johndoe@example.com"
                    handleChange={this.handleChange}
                  />

                  <p>Password</p>
                  <FormInput
                    type="password"
                    name="password"
                    value={password}
                    placeholder="••••••••"
                    handleChange={this.handleChange}
                  />

                  <Button type="submit">
                      Login
                  </Button>

                  <div className="socialSignIn">
                    <div className="row">
                      <Button onClick={signInWithGoogle}>
                        Sign in with Google
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
        };
};


export default SignIn;