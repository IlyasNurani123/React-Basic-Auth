import Axios from 'axios';
import { SERVER_URL_LOCAL } from '../constants';

function getTasks() {
  return new Promise((resolve, reject) => {
    Axios.get(`${SERVER_URL_LOCAL}/tasks`)
      .then((response) => {
        if (response) {
          resolve(response.data.data);
        }
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
}
function addTask(payload) {
  return new Promise((resolve, reject) => {
    Axios.post(`${SERVER_URL_LOCAL}/tasks`, payload)
      .then((response) => {
        if (response) {
          resolve(response.data.data);
        }
      })
      .catch((error) => {
        reject(error.response);
      });
  });
}

function deleteTask(id) {
  return new Promise((resolve, reject) => {
    Axios.delete(`${SERVER_URL_LOCAL}/tasks/${id}`)
      .then((response) => {
        if (response) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error.response);
      });
  });
}
export { getTasks, addTask, deleteTask };
