import React, { Component } from 'react';
import './styles.scss';

import { auth, handleUserProfile } from './../../firebase/utils';

import FormInput from './../forms/FormInput';
import Button from './../forms/Button';

const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: []
};


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  handleFormSubmit = async event => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      const err = ['Password doesn\'t match'];
      this.setState({
        errors: err
      });
      return;
    }

    if (password.length < 6) {
        const err = ["Password should be more than 6 characters"];
        this.setState({
          errors: err,
        });
        return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await handleUserProfile(user, { displayName });

      this.setState({
        ...initialState,
      });
    } catch (err) {
      //console.log(err);
    }
  }

  render() {
    const {
      displayName,
      email,
      password,
      confirmPassword,
      errors,
    } = this.state;

    return (
      <div className="signup">
        <div className="wrap">
          <h2>Welcome new customer</h2>

          {errors.length > 0 && (
            <ul>
              {errors.map((err, index) => {
                return <li key={index}>{err}</li>;
              })}
            </ul>
          )}

          <div classname="formWrap">
            <form onSubmit={this.handleFormSubmit}>
              <p>Your name</p>
              <FormInput
                type="text"
                name="displayName"
                value={displayName}
                placeholder="Knock knock, who's there?"
                onChange={this.handleChange}
              />

              <p>Your email</p>
              <FormInput
                type="email"
                name="email"
                value={email}
                placeholder="johndoe@example.com"
                onChange={this.handleChange}
              />

              <p>Enter your Password</p>
              <FormInput
                type="password"
                name="password"
                value={password}
                placeholder="••••••••"
                onChange={this.handleChange}
              />

              <p>Confirm Password</p>
              <FormInput
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="••••••••"
                onChange={this.handleChange}
              />

              <Button type="submit">Sign up</Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
