import React, { useState, useEffect, useContext } from 'react';
import SideMainLayout from '../layouts/SideMainLayout';
import { Container, Card, Form, Table, Button } from 'react-bootstrap';
import CustomModal from '../layouts/CustomModal';
import CustomAlert from '../layouts/CustomAlert';
import { TasksContext } from '../../context-api/tasksContext';
import { Projects } from '../../context-api/projectsContext';
import { WithAuthorization } from '../../context-api/session';
import {
  getTasks,
  addTask,
  deleteTask,
  getTask,
  updateTask,
} from '../../services/tasksServices';
import { getProjects } from '../../services/projects-services';

function Tasks(props) {
  const [taskState, setTasks] = useState({
    task_name: '',
    project_id: null,
    task_id: null,
    completion_date: '',
    total_hours_worked: '',
  });

  const task = useContext(TasksContext);
  const project = useContext(Projects);
  const [show, setShow] = useState(false);
  const [showAlert, setshowAlert] = useState(false);
  // const [tasksArray, setTask] = useState([]);
  const { tasks = [] } = task.state;
  // const [taskArray, setTaskArray] = useState(tasks);
  const handleOnShow = () => setShow(true);
  const handleOnShowUpdate = (id) => {
    setShow(true);
    setTasks({
      task_id: id,
    });
    getTask(id).then((response) => {
      setTasks({
        task_name: response.task_name,
        project_id: response.project_id,
        task_id: response.id,
        completion_date: response.completion_date,
        total_hours_worked: response.total_hours_worked,
      });
    });
  };
  const handleClose = () => setShow(false);
  const handleShowAlert = () => setshowAlert(true);
  const handleCancelAlert = () => setshowAlert(false);

  function handleOnChange(e) {
    setTasks({ ...taskState, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!taskState.task_id) {
      addTask(taskState)
        .then((response) => {
          task.dispatch({
            type: 'ADD_TASKS',
            payload: response,
          });
          handleClose();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      updateTask(taskState.task_id, taskState)
        .then((response) => {
          task.dispatch({
            type: 'UPDATE_TASKS',
            payload: response,
          });
          handleClose();
        })
        .catch((error) => {
          console.log('******error***', error);
        });
    }
  }

  const taskDelete = (id) => {
    deleteTask(id)
      .then((response) => {
        task.dispatch({
          type: 'DELETE_TASK',
          payload: id,
        });
        handleCancelAlert();
      })
      .catch((error) => {
        console.log('some error', error);
      });
  };
  useEffect(() => {
    getProjects().then((response) => {
      if (response) {
        project.dispatch({
          type: 'FETCH_PROJECTS',
          payload: response,
        });
        // this.setState({ projects: response });
      }
    });
    getTasks()
      .then((response) => {
        task.dispatch({
          type: 'FETCH_TASKS',
          payload: response,
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);

  // useEffect(() => {
  //   setTask(tasks);
  // }, [tasks]);

  return (
    <SideMainLayout>
      {console.log('investigate task:', tasks)}
      <Container>
        <Card>
          <Card.Header>
            <Button variant='primary' onClick={handleOnShow}>
              Add Task
            </Button>
            <CustomModal
              show={show}
              handleClose={handleClose}
              title={taskState.task_id ? 'Update project' : 'Add Project'}
              actionText='Submit'
            >
              <Form onSubmit={onSubmit}>
                <Form.Group controlId='formBasicName'>
                  <Form.Label>Task Title</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter task name'
                    name='task_name'
                    value={taskState.task_name}
                    onChange={handleOnChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    as='select'
                    name='project_id'
                    onChange={handleOnChange}
                    value={taskState.project_id}
                    selected
                  >
                    {/* {console.log('value', project.state.projects)} */}
                    <option>Select Project</option>
                    {project.state.projects.map((project) => {
                      return (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Completion Date</Form.Label>
                  <Form.Control
                    type='date'
                    name='completion_date'
                    value={taskState.completion_date}
                    onChange={handleOnChange}
                  />
                </Form.Group>
                <Form.Group controlId='formBasicName'>
                  <Form.Label>No Of Hours Worked</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter worked hours'
                    name='total_hours_worked'
                    value={taskState.total_hours_worked}
                    onChange={handleOnChange}
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
          </Card.Header>
          <Card.Body>
            <Card.Title> All Tasks </Card.Title>
            <Table striped bordered hover size='sm'>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Task Title</th>
                  <th>project Name</th>
                  <th>completion Date</th>
                  <th>Total Hours Work</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => {
                  return (
                    <tr key={`task-${index}`}>
                      <td>{task.id}</td>
                      <td>{task.task_name}</td>
                      <td>{task.name}</td>
                      <td>{task.completion_date}</td>
                      <td>{task.total_hours_worked}</td>
                      <td>
                        <CustomAlert
                          showAlert={showAlert}
                          cancelAction={handleCancelAlert}
                          alertText='Are you sure you want to delete this item?'
                          cancelText='cancel'
                          confirmText='Confirm'
                          confirmedAction={taskDelete.bind(this, task.id)}
                        />
                        <Button
                          className='mr-2'
                          size='sm'
                          onClick={handleOnShowUpdate.bind(this, task.id)}
                        >
                          edit
                        </Button>
                        <Button
                          variant='danger'
                          size='sm'
                          onClick={handleShowAlert}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
                <tr></tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </SideMainLayout>
  );
}
const condition = (authUser) => !!authUser;
export default WithAuthorization(condition)(Tasks);
