import { Navigate } from 'react-router-dom';

const ClientPrivateRoute = ({ children }) => {
  const clientToken = localStorage.getItem('clientToken');

  if (!clientToken) {
    return <Navigate to="/client/register" replace />;
  }

  return children;
};

export default ClientPrivateRoute;
