// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component ,roles = []}) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        // If no user is logged in, redirect to the login page
        return <Navigate to="/login" />;
    }

    if (roles.length && !roles.includes(user.role)) {
        // If the user does not have the required role, redirect to the dashboard
        return <Navigate to="/dashboard" />;
    }


      // If user is logged in and has the required role, render the component
      return <Component />;
};

export default PrivateRoute;
