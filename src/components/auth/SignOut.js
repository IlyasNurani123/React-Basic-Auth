import React from 'react';
import * as ROUTES from '../../constants/routes';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../firebse';

const SignOutButton = (props) => {
  function handleOnSignout() {
    props.firebase
      .doSignOut()
      .then(() => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        props.history.push(ROUTES.SIGN_IN);
      })
      .catch((err) => console.log('Error signing out'));
  }

  return (
    <button type='button' onClick={handleOnSignout}>
      Sign Out
    </button>
  );
};

export default withRouter(withFirebase(SignOutButton));
