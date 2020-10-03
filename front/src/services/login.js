import axios from 'axios';

/**
 * Operations for server connections for user login
 * @type {string}
 */

const baseUrl = 'http://localhost:3000/api/login';

const login = async (credentials) => {
  // console.log('login.js',credentials);
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
