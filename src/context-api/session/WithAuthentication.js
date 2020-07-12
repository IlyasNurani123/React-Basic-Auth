import React, { useState, useEffect } from 'react';
import { AuthUserContext } from './auth-context';
import { withFirebase } from '../../firebse';

const withAuthentication = (Component) => {
  function WithAuthentication(props) {
    let listner = null;
    const [authUser, setAuthUser] = useState({
      authenticatedUser: null,
    });

    useEffect(() => {
      listner = props.firebase.auth.onAuthStateChanged((auth) => {
        auth
          ? setAuthUser({ authenticatedUser: auth })
          : setAuthUser({ authenticatedUser: null });
      });
      return () => {
        listner();
      };
    }, []);

    return (
      <AuthUserContext.Provider value={authUser.authenticatedUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  }
  return withFirebase(WithAuthentication);
};

export default withAuthentication;
