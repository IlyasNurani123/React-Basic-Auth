import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../../firebse';
import { Container, Card, Form, Button } from 'react-bootstrap';
import SideLessLayout from '../layouts/SideLessLayout';
function SignupForm(props) {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: null,
  });

  function handleOnChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleOnSubmit(e) {
    debugger;
    e.preventDefault();

    const { name, email, password } = user;

    props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return props.firebase.user(authUser.user.uid).set({ name, email });
      })
      .then((response) => {
        setUser({ ...user });
        props.history.push(ROUTES.DASHBOARD);
      })
      .catch((error) => {
        setUser({ error });
      });
  }
  const { name, email, password, confirmPassword, error } = user;
  const isInvalid =
    password !== confirmPassword ||
    password === '' ||
    email === '' ||
    name === '';
  return (
    <SideLessLayout>
      <Container className='card-wrapper'>
        <Card className='custom-card'>
          <Card.Header className='text-center'>
            <h2>Sign Up</h2>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleOnSubmit}>
              <Form.Group controlId='formBasicName'>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Full Name'
                  name='name'
                  value={user.name}
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Form.Group controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  name='email'
                  value={user.email}
                  onChange={handleOnChange}
                />
              </Form.Group>

              <Form.Group controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={user.password}
                  onChange={handleOnChange}
                />
              </Form.Group>

              <Form.Group controlId='formBasicConfirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm Password'
                  name='confirmPassword'
                  value={user.confirmPassword}
                  onChange={handleOnChange}
                />
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
const Register = withRouter(withFirebase(SignupForm));
export default Register;
