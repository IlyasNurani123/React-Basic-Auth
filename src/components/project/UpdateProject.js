import React, { Component } from 'react';
import CustomModal from '../layouts/CustomModal';
import { Form, Button } from 'react-bootstrap';
import { getProject, udateProject } from '../../services/projects-services';
import withProject from '../../context-api/withProject';

class UpdateProject extends Component {
  state = {
    id: '',
    name: '',
    description: '',
    other_details: '',
  };

  componentDidMount() {
    getProject(this.props.projectId).then((response) => {
      console.log('response check', response);
      this.setState({
        id: response.data.id,
        name: response.data.name,
        description: response.data.description,
        other_details: response.data.other_details,
      });
    });
  }

  handleOnChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.props.projects);
    udateProject(this.state.id, this.state)
      .then((response) => {
        this.props.projects.dispatch({
          type: 'UPDATE_PROJECTS',
          payload: response,
        });
        this.props.handleClose();
      })
      .catch((error) => {
        console.log('some error', error);
      });
  };
  render() {
    return (
      <CustomModal
        show={true}
        handleClose={this.props.handleClose}
        title='Update Project'
        actionText='Submit'
      >
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId='formBasicName'>
            <Form.Label> Project Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Project name'
              name='name'
              value={this.state.name}
              onChange={this.handleOnChange}
            />
          </Form.Group>
          <Form.Group controlId='formBasicDescription'>
            <Form.Label>Project description</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter project description'
              name='description'
              value={this.state.description}
              onChange={this.handleOnChange}
            />
          </Form.Group>
          <Form.Group controlId='formBasicOtherDetails'>
            <Form.Label>Others Detail</Form.Label>
            <Form.Control
              type='text'
              placeholder='Other_details'
              name='other_details'
              value={this.state.other_details}
              onChange={this.handleOnChange}
            />
          </Form.Group>
          <Button
            type='submit'
            className='custom-button'
            // disabled={isInvalid}
          >
            Submit
          </Button>
        </Form>
      </CustomModal>
    );
  }
}
export default withProject(UpdateProject);
