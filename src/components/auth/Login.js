import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../../firebse';
import { compose } from 'recompose';
import './auth.css';
import { Container, Form, Button, Card } from 'react-bootstrap';
import SideLessLayout from '../layouts/SideLessLayout';
function Login(props) {
  const [user, setUser] = useState({
    email: '',
    password: '',
    error: '',
  });

  function handleOnChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleOnSubmit(e) {
    const { email, password } = user;
    props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser({ ...user });
        props.history.push(ROUTES.DASHBOARD);
      })
      .catch((error) => {
        setUser({ error });
      });

    e.preventDefault();
  }
  const { email, password, error } = user;
  const isInvalid = password === '' || email === '';
  return (
    <SideLessLayout>
      <Container className='card-wrapper'>
        <Card className='custom-card'>
          <Card.Header className='custom-card-header'>
            <h3>Login</h3>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleOnSubmit}>
              <Form.Group controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  name='email'
                  onChange={handleOnChange}
                />
              </Form.Group>

              <Form.Group controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  name='password'
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Form.Group controlId='formBasicCheckbox'>
                <Form.Check type='checkbox' label='remember me' />
              </Form.Group>
              <Button
                type='submit'
                className='custom-button'
                disabled={isInvalid}
              >
                Submit
              </Button>
              {error && <p>{error.message}</p>}
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </SideLessLayout>
  );
}

const Landing = compose(withRouter, withFirebase)(Login);

export default Landing;
