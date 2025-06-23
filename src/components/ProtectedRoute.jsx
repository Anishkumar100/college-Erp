// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ allowedRoles }) => {
  const userRole = JSON.parse(localStorage.getItem('userRole'));

  if (!userRole) {
    // Not logged in
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(userRole)) {
    // Logged in but not authorized for this route
    return <Navigate to={`/dashboard/${userRole}`} />;
  }

  return <Outlet />;
};

/*
Main thing to notice, with this component u are preventing the user to reach other dashboards by changing the url. How?

very simple, while u login u store the userRole in the local storage. and when u change the url manually with the help of routes u will be traversed to ur specific element. And now since u wrapped the element inside the ProtectedRoute component, first ProtectedRoute component will be executed, where u pass the prop of the allowedRoles array (u can do it as a string also ). where in here we get the userRole from the local storage and when we try to go to another dashboard, we compare ur userRole on ur login to the allowedRole u got on trying illegal entry. and ofcourse u are pushed back to ur original role or dashboard
*/

/*The outlet acts as the children content present inside the ProtectedRoute. And in the loginPage itself u provide the condition of not coming back to loginPage once u have logged in */