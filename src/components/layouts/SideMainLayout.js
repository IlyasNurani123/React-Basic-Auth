import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Sidebar from './sidebar/SideBar';
import Navbar from './NavigationBar';
export default function SideMainLayout(props) {
  return (
    <>
      <Navbar />
      <Row>
        <Col lg={2} md={2}>
          <Sidebar />
        </Col>
        <Col lg={10} md={10}>
          {props.children}
        </Col>
      </Row>
    </>
  );
}
