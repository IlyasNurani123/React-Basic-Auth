import React from 'react';
import { Modal, Button } from 'react-bootstrap';
function CustomAlert(props) {
  return (
    <>
      <Modal show={props.showAlert} backdrop='static' keyboard={false}>
        {/* <Alert.Heading>{this.props.alertText}</Alert.Heading> */}
        <Modal.Body>
          <p>{props.alertText}</p>
        </Modal.Body>
        <Modal.Footer>
          <div className='d-flex justify-content-end'>
            <Button onClick={props.confirmedAction} variant='outline-info'>
              {props.confirmText}
            </Button>
            <Button onClick={props.cancelAction} variant='outline-danger'>
              {props.cancelText}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default CustomAlert;
