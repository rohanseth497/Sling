const API = process.env.REACT_APP_API_URL;

const headers = () => {
  const token = JSON.parse(localStorage.getItem('token'));

  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer: ${token}`,
  };
};

const queryString = (params) => {
  const query = Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
  return `${query.length ? '?' : ''}${query}`;
};

export default {
  fetch(url, params = {}) {
    return fetch(`${API}${url}${queryString(params)}`, {
      method: 'GET',
      headers: headers(),
    })
      .then(response => response.json());
  },
  post(url, data) {
    const body = JSON.stringify(data);

    return fetch(`${API}${url}`, {
      method: 'POST',
      headers: headers(),
      body,
    })
      .then(response => response.json());
  },
  patch(url, data) {
    const body = JSON.stringify(data);

    return fetch(`${API}${url}`, {
      method: 'PATCH',
      headers: headers(),
      body,
    })
      .then(response => response.json());
  },
  delete(url) {
    return fetch(`${API}${url}`, {
      method: 'DELETE',
      headers: headers(),
    })
      .then(response => response.json());
  },
};
