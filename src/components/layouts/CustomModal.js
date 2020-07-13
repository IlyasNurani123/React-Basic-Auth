import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
class CustomModal extends Component {
  render() {
    return (
      <>
        <Modal
          show={this.props.show}
          onHide={this.props.handleClose}
          backdrop='static'
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.children}</Modal.Body>
        </Modal>
      </>
    );
  }
}

export default CustomModal;
