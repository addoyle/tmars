import fetch from 'isomorphic-fetch';

const API_URL =
  typeof window === 'undefined' || process.env.NODE_ENV === 'test'
    ? process.env.BASE_URL || `http://localhost:${process.env.PORT}/api`
    : 'api';

export function API(
  endpoint,
  method = 'get',
  body = null,
  headers = { 'content-type': 'application/json' }
) {
  return fetch(`${API_URL}/${endpoint}`, {
    headers,
    method,
    body: body && JSON.stringify(body)
  })
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => (!response.ok ? Promise.reject(json) : json))
    .then(
      response => response,
      error => error
    );
}

export function subscribe(endpoint, callback) {
  const evSrc = new EventSource(`${API_URL}/${endpoint}`);
  evSrc.onmessage = e => callback(JSON.parse(e.data));
  return evSrc;
}
