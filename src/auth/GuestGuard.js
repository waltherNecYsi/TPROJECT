import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
// routes
import { useState } from 'react';
import { PATH_AUTH, PATH_DASHBOARD } from '../routes/paths';
// components
import LoadingScreen from '../components/loading-screen';
//
import { useAuthContext } from './useAuthContext';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const { isAuthenticated, isInitialized, isRegistered } = useAuthContext();

  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (pathname.startsWith('/dashboard/') && !isRegistered && !isAuthenticated) {
    return <Navigate to={PATH_AUTH.login} />;
  }

  if (pathname === '/auth/register' && isRegistered) {
    return <Navigate to={PATH_AUTH.login} />;
  }

  if (pathname === '/auth/login' && isAuthenticated) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  return <> {children} </>;
}
