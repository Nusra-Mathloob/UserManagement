// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Create from './Components/Create';
import PrivateRoute from './Components/PrivateRoute';
import UpdateUser from './Components/UpdateUser';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Login />} />

                <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
                <Route path="/create" element={<PrivateRoute component={Create} roles={['admin']} />} />
               
                <Route path="/updateuser" element={<PrivateRoute component={UpdateUser} roles={['admin']} />} />
            </Routes>
        </Router>
    );
};

export default App;
