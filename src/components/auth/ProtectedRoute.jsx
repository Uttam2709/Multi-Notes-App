import React from 'react';
import { Route, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? ( 
          <Component {...props} />
        ) : ( 
          <Link to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
