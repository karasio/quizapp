import axios from 'axios';

/**
 * CRUD operations for server connections for user handling
 * @type {string}
 */

const baseUrl = 'http://localhost:3000/api/users';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const get = (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.get(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.post(baseUrl, newObject, config);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.put(`${baseUrl}/${id}`, newObject, config);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};

export default {
  getAll, get, create, update, setToken, remove,
};
