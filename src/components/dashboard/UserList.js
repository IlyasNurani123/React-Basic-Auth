import React, { useState, useEffect } from 'react';
import { withFirebase } from '../../firebse';
import Table from 'react-bootstrap/Table';
import { Container } from 'react-bootstrap';
function UserList(props) {
  const [users, setUsers] = useState({
    loading: false,
    user: [],
  });

  useEffect(() => {
    setUsers({ ...users, loading: true });
    props.firebase.users().on('value', (snapshot) => {
      const usersObject = snapshot.val();
      const userList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));
      setUsers({
        user: userList,
        loading: false,
      });
    });
  }, []);

  return (
    <Container>
      <h3 className='m-3'>User Details</h3>
      <Table striped bordered hover className='mt-2'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.user.map((user) => {
            return (
              <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
export default withFirebase(UserList);
