import Axios from '../constants/setAxiosDefaults';

function getTasks() {
  return new Promise((resolve, reject) => {
    Axios.get(`/tasks`)
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

function getTask(id) {
  return new Promise((resolve, reject) => {
    Axios.get(`/task/${id}`)
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

function addTask(payload) {
  return new Promise((resolve, reject) => {
    Axios.post(`/tasks`, payload)
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

function updateTask(id, payload) {
  return new Promise((resolve, reject) => {
    Axios.put(`/tasks/${id}`, payload)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
}

function deleteTask(id) {
  return new Promise((resolve, reject) => {
    Axios.delete(`/tasks/${id}`)
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
export { getTasks, addTask, deleteTask, getTask, updateTask };
