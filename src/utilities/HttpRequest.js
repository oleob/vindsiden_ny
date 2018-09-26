import axios from 'axios';

const getRequest = endpointUrl => {
  return new Promise((resolve, reject) => {
    axios
      .get(endpointUrl)
      .then(res => {
        resolve(res);
      })
      .catch(err => reject(err));
  });
};

export { getRequest };
