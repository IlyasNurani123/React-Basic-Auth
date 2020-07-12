import Axios from 'axios';
import { SERVER_URL_LOCAL } from '../constants';

function getProjects() {
  return new Promise((resolve, reject) => {
    Axios.get(`${SERVER_URL_LOCAL}/projects`)
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
function addProject(payload) {
  return new Promise((resolve, reject) => {
    Axios.post(`${SERVER_URL_LOCAL}/projects`, payload)
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

function deleteProject(id) {
  return new Promise((resolve, reject) => {
    Axios.delete(`${SERVER_URL_LOCAL}/projects/${id}`)
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
export { getProjects, addProject, deleteProject };
