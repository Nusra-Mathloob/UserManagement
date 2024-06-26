// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../Constants/Url';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';

const Dashboard = () => {
  const [apiData, setAPIData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const updateUser = ({ id, username,email,role }) => {
    localStorage.setItem("id", id);
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);
    navigate("/UpdateUser");
  };

  //delete user
  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    callGetAPI();
};

 //Display Data
 const callGetAPI = async () => {
  const resp = await axios.get(`${API_URL}`);
  setAPIData(resp.data);
};

  //Call data
  useEffect(() => {
    callGetAPI();
  }, []);



    const handleCreate = () => {
        navigate('/create');
    };

    const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
};


  const filteredData = apiData.filter(data =>
    data.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    data.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    data.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

    return (
        <Container>
          <Typography variant="h4" component="h2" gutterBottom>
            User Managment Dashboard
          </Typography>
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Add User
          </Button>
          <Button variant="contained" color="secondary"  onClick={handleLogout} sx={{marginLeft:"20px"}}>Logout</Button>
      
          <TextField
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ mt: 2, mb: 2, width: '100%' }}
          />
       

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map(data => (
              <TableRow key={data.id}>
                <TableCell>{data.username}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{data.role}</TableCell>
                <TableCell>
                  <Button variant="contained" color="error" onClick={() => handleDelete(data.id)}>
                    Delete
                  </Button>
                  <Button variant="contained"  color="warning" sx={{marginLeft:"5px"}} onClick={() => updateUser(data)}>Update</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    );
};

export default Dashboard;
