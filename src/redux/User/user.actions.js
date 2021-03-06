import userTypes from './user.types';
import { auth, handleUserProfile,GoogleProvider } from "./../../firebase/utils";



export const emailSignInStart = userCredentials => ({
  type: userTypes.EMAIL_SIGN_IN_START,
  payload: userCredentials
});


export const signInSuccess = user => ({
  type: userTypes.SIGN_IN_SUCCESS,
  payload: user
});

















export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user
});

export const resetAllAuthForms = () => ({
  type: userTypes.RESET_AUTH_FORMS
});

export const signInUser =  ({ email, password }) =>  async dispatch => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      dispatch({
          type: userTypes.SIGN_IN_SUCCESS,
          payload: true
      });

    } catch (err) {
      //console.log(err);
    }
};

export const signUpUser = ({ displayName, email, password, confirmPassword }) =>  async dispatch => {
    if (password !== confirmPassword) {
      const err = ['Password doesn\'t match'];
      dispatch({
          type: userTypes.SIGN_UP_ERROR,
          payload: err
      });
      return;
    }

    if (password.length < 6) {
        const err = ["Password should be more than 6 characters"];
        dispatch({
          type: userTypes.SIGN_UP_ERROR,
          payload: err
        });
        return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await handleUserProfile(user, { displayName });
      dispatch({
          type: userTypes.SIGN_UP_SUCCESS,
          payload: true
      });
     /* reset();
     props.history.push('/');
 */
    } catch (err) {
      //console.log(err);
    } 
};


export const resetPassword = ({ email }) => async dispatch => {

    const config = {
      url: "http://localhost:3000/login",
    };

    try {
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          dispatch ({
            type: userTypes.RESET_PASSWORD_SUCCESS,
            payload: true
          });
        })
        .catch(() => {
          const err = ["Email not found, please try again"];
          dispatch({
          type: userTypes.RESET_PASSWORD_ERROR,
          payload: err
        });
        });
    } catch (err) {
      //console.log("Something went wrong");
    }
};

export const signInWithGoogle = () => async dispatch => {
  try {
    await auth.signInWithPopup(GoogleProvider)
    .then(() => {
      dispatch({
        type: userTypes.SIGN_IN_SUCCESS,
        payload: true
      });
    });
  } catch (err) {
    //console.log.err
  }
  auth.signInWithPopup(GoogleProvider);
};