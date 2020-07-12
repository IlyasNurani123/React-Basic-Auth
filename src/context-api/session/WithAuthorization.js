import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../../firebse';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from './auth-context';

const WithAuthorization = (condition) => (Component) => {
  function WithAuthorization(props) {
    let listner = null;
    useEffect(() => {
      listner = props.firebase.auth.onAuthStateChanged((auth) => {
        if (!condition(auth)) {
          props.history.push(ROUTES.SIGN_IN);
        }
      });
      return () => {
        listner();
      };
    }, []);
    return (
      <AuthUserContext.Consumer>
        {(authUser) => (condition(authUser) ? <Component {...props} /> : null)}
      </AuthUserContext.Consumer>
    );
  }

  return compose(withFirebase, withRouter)(WithAuthorization);
};
export default WithAuthorization;
