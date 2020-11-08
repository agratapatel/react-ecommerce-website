import React, { Component } from 'react';
import './styles.scss';
import Button from './../forms/Button';
import { signInWithGoogle } from './../../firebase/utils';

class SignIn extends Component {

    handleSubmit = async e => {
        e.preventDefault();
    }

    render () {
        return (
            <div className="signin">
                <div className="wrap">
                    <h2>
                        Login
                    </h2>

                    <div className="formWrap">
                        <form onSubmit={this.handleSubmit}>
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