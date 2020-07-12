import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import * as ROUTES from '../../constants/routes';
import SignOUtButton from '../auth/SignOut';
import { AuthUserContext } from '../../context-api/session';
import '../../App.css';

function NavigationBar() {
  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <Navbar bg='light' variant='light' id='custom-nav'>
          <Link to={ROUTES.LANDING}>
            <h5 className='text-dark'>BasicReactAuth</h5>
          </Link>
          <Nav className='mr-auto'>
            {/* <Nav.Link href='#home' className='text-white'></Nav.Link> */}
          </Nav>
          {!authUser ? (
            <>
              <Link to={ROUTES.SIGN_IN} className='text-dark'>
                Login
              </Link>
              <Link to={ROUTES.SIGN_UP} className='text-dark m-3'>
                Sign Up
              </Link>
            </>
          ) : (
            <Nav.Link>
              <SignOUtButton />
            </Nav.Link>
          )}
        </Navbar>
      )}
    </AuthUserContext.Consumer>
  );
}

export default NavigationBar;
