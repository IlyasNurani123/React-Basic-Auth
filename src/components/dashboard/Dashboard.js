import React from 'react';
import SideMainLayout from '../layouts/SideMainLayout';
import { WithAuthorization } from '../../context-api/session';
import { Container } from 'react-bootstrap';
import UserList from './UserList';
function Dashboard(props) {
  return (
    <SideMainLayout>
      <Container>
        <UserList />
      </Container>
    </SideMainLayout>
  );
}
const condition = (authUser) => !!authUser;
export default WithAuthorization(condition)(Dashboard);
