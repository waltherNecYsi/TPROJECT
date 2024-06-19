// routes
import { PATH_AUTH } from '../routes/paths';
// utils
// import axios from '../utils/axios';


// ----------------------------------------------------------------------

function jwtDecode(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------

export const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    alert('Token expired');

    localStorage.removeItem('accessToken');

    window.location.href = PATH_AUTH.login;
  }, timeLeft);
};

// ----------------------------------------------------------------------

export const setSession = (token,user,empId) => {
  if (token) {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('username', user);
    localStorage.setItem('empId', empId);

    // axios.defaults.headers.common.Authorization = `Bearer ${token.name}`;

    // This function below will handle when token is expired
    // const { exp } = jwtDecode(accessToken); // ~3 days by minimals server
    // tokenExpired(exp);
  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('empId');
    // delete axios.defaults.headers.common.Authorization;
  }
};

export const setEstablishment = (establishment_id) => {
  if (establishment_id) {
    localStorage.setItem('establishment_id', establishment_id);

    // This function below will handle when token is expired
    // const { exp } = jwtDecode(accessToken); // ~3 days by minimals server
    // tokenExpired(exp);
  } else {
    localStorage.removeItem('establishment_id');
  }
};