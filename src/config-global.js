// routes
import { PATH_DASHBOARD } from "./routes/paths";
// API
// ----------------------------------------------------------------------

// export const HOST_API_KEY = process.env.REACT_APP_HOST_API_KEY || '';
export const HOST_API_KEY = "127.0.0.1:8000";
// export const HOST_API_KEY = 'www.glomeran.com';

export const FIREBASE_API = {
  apiKey: import.meta.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.VITE_FIREBASE_APPID,
  measurementId: import.meta.VITE_FIREBASE_MEASUREMENT_ID,
};

export const COGNITO_API = {
  userPoolId: import.meta.VITE_AWS_COGNITO_USER_POOL_ID,
  clientId: import.meta.VITE_AWS_COGNITO_CLIENT_ID,
};

export const AUTH0_API = {
  clientId: import.meta.VITE_AUTH0_CLIENT_ID,
  domain: import.meta.VITE_AUTH0_DOMAIN,
};

export const MAP_API = import.meta.VITE_MAPBOX_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.general.app; // as '/dashboard/app'
export const PATH_CONSULTA = "/consultar"; // as '/dashboard/app'

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  H_MOBILE: 64,
  H_MAIN_DESKTOP: 88,
  H_DASHBOARD_DESKTOP: 92,
  H_DASHBOARD_DESKTOP_OFFSET: 92 - 32,
};

export const NAV = {
  W_BASE: 260,
  W_DASHBOARD: 280,
  W_DASHBOARD_MINI: 88,
  //
  H_DASHBOARD_ITEM: 48,
  H_DASHBOARD_ITEM_SUB: 36,
  //
  H_DASHBOARD_ITEM_HORIZONTAL: 32,
};

export const ICON = {
  NAV_ITEM: 24,
  NAV_ITEM_HORIZONTAL: 22,
  NAV_ITEM_MINI: 22,
};
