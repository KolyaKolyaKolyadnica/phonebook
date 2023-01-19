import { useSelector } from 'react-redux';
import { Navigate, redirect, Route } from 'react-router-dom';

export const PublicRoute = ({
  redirectPath = '/contacts',
  children,
  restricted = false,
}) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  if (isLoggedIn && restricted) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};
