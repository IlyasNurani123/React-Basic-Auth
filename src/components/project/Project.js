import React, { Component } from 'react';
import SideMainLayout from '../layouts/SideMainLayout';
import { Button, Card, Container, Table, Form } from 'react-bootstrap';
import CustomModal from '../layouts/CustomModal';
import CustomAlert from '../layouts/CustomAlert';
import { WithAuthorization } from '../../context-api/session';
import {
  getProjects,
  addProject,
  deleteProject,
} from '../../services/projects-services';
import withProject from '../../context-api/withProject';
import UpdateProject from './UpdateProject';

class Project extends Component {
  state = {
    show: false,
    showAlert: false,
    ShowUpdateModel: false,
    name: '',
    description: '',
    other_details: '',
    error: null,
    projects: [],
    projectId: null,
  };

  handleShow = () => {
    this.setState({
      show: true,
    });
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };
  handleShowUpdateModel = (id) => {
    this.setState({
      ShowUpdateModel: true,
      projectId: id,
    });
  };
  handleUpdateCloseModel = () => {
    this.setState({
      ShowUpdateModel: false,
    });
  };
  handleAlertShow = () => {
    this.setState({
      showAlert: true,
    });
  };

  handleCancelAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  getAllProjects = () => {
    getProjects()
      .then((response) => {
        if (response) {
          console.log('this.project', response);
          this.props.projects.dispatch({
            type: 'FETCH_PROJECTS',
            payload: response,
          });
          // this.setState({ projects: response });
        }
      })
      .catch();
  };
  componentDidMount() {
    this.getAllProjects();
  }
  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.projects.state.projects !== nextState.projects) {
      this.setState({ projects: nextProps.projects.state.projects });
    }
  }

  handleOnChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { name, description, other_details } = this.state;
    addProject({ name, description, other_details })
      .then((response) => {
        this.handleClose();
        if (response) {
          this.props.projects.dispatch({
            type: 'ADD_PROJECTS',
            payload: response,
          });
        }
      })
      .catch((error) => {
        console.log('error ', error);
      });
  };

  projectDelete = (id) => {
    deleteProject(id)
      .then((response) => {
        this.props.projects.dispatch({
          type: 'DELETE_PROJECT',
          payload: id,
        });
        // console.log('Delete data', response);
      })
      .catch((error) => {
        console.log('some error', error);
      });
  };
  render() {
    const { name, description } = this.state;
    const isInvalid = name === '' || description === '';
    return (
      <SideMainLayout>
        <Container>
          <Card>
            <Card.Header>
              <Button variant='primary' onClick={this.handleShow}>
                Add Project
              </Button>
              {this.state.ShowUpdateModel && (
                <UpdateProject
                  handleClose={this.handleUpdateCloseModel}
                  projectId={this.state.projectId}
                />
              )}
              <CustomModal
                show={this.state.show}
                handleClose={this.handleClose}
                title='Add Project'
                actionText='Submit'
              >
                <Form onSubmit={this.onSubmit}>
                  <Form.Group controlId='formBasicName'>
                    <Form.Label>Project Name</Form.Label>
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
                    disabled={isInvalid}
                  >
                    Submit
                  </Button>
                </Form>
              </CustomModal>
            </Card.Header>
            <Card.Body>
              <Card.Title>Project List </Card.Title>
              <Table striped bordered hover size='sm'>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Project Name</th>
                    <th>project Description</th>
                    <th>Other Details</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.projects.map((project, index) => {
                    return (
                      <tr key={`project -${index}`}>
                        <td>{project.id}</td>
                        <td>{project.name}</td>
                        <td>{project.description}</td>
                        <td>{project.other_details}</td>
                        <td>
                          <CustomAlert
                            showAlert={this.state.showAlert}
                            cancelAction={this.handleCancelAlert}
                            confirmedAction={this.projectDelete.bind(
                              this,
                              project.id
                            )}
                            alertText='Are you sure you want to delete this item?'
                            cancelText='cancel'
                            confirmText='Confirm'
                          />

                          <Button
                            className='mr-2'
                            size='sm'
                            onClick={this.handleShowUpdateModel.bind(
                              this,
                              project.id
                            )}
                          >
                            edit
                          </Button>
                          <Button
                            variant='danger'
                            size='sm'
                            onClick={this.handleAlertShow}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Container>
      </SideMainLayout>
    );
  }
}
const condition = (authUser) => !!authUser;
export default WithAuthorization(condition)(withProject(Project));
