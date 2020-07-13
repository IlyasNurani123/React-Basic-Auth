import axios from 'axios';
import { SERVER_URL_LOCAL } from './urlConstants';
axios.defaults.baseURL = SERVER_URL_LOCAL;
// axios.defaults.headers.common['Authorization'] =
//   'Bearer ' + window.localStorage.getItem('token');
// axios.defaults.headers.post['Content-Type'] = 'application/json';
export default axios;
