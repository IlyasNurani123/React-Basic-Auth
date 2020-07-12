import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Dashboard from '../components/dashboard/Dashboard';
import Projects from '../components/project/Project';
import Tasks from '../components/tasks/Tasks';

import * as ROUTES from '../constants/routes';

function Routes(props) {
  return (
    <div>
      <Route exact path={ROUTES.LANDING} component={Login} />
      <Route exact path={ROUTES.SIGN_IN} component={Login} />
      <Route exact path={ROUTES.SIGN_UP} component={Register} />
      <Route exact path={ROUTES.DASHBOARD} component={Dashboard} />
      <Route exact path={ROUTES.PROJECTS} component={Projects} />
      <Route exact path={ROUTES.TASKS} component={Tasks} />
    </div>
  );
}

export default Routes;
