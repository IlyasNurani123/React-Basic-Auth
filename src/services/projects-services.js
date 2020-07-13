import Axios from '../constants/setAxiosDefaults';
// import { SERVER_URL_LOCAL } from '../constants';

function getProjects() {
  return new Promise((resolve, reject) => {
    Axios.get(`/projects`)
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
    Axios.post(`/projects`, payload)
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
function getProject(id) {
  return new Promise((resolve, reject) => {
    Axios.get(`/project/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
}

function udateProject(id, payload) {
  return new Promise((resolve, reject) => {
    Axios.put(`/projects/${id}`, payload)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
}
function deleteProject(id) {
  return new Promise((resolve, reject) => {
    Axios.delete(`/projects/${id}`)
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
export { getProjects, addProject, deleteProject, udateProject, getProject };
