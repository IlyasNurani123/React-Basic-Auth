import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import { Nav } from 'react-bootstrap';
import '../../../App.css';

import './style.css';

class SideBar extends Component {
  render() {
    return (
      <div className='sidebar'>
        <Nav className='side-menu-items'>
          <Nav.Item>
            <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to={ROUTES.PROJECTS}>Project</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to={ROUTES.TASKS}>Task</Link>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
}

export default SideBar;
