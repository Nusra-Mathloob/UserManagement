// src/components/Create.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../Constants/Url';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

function UpdateUser() {

    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const navigate = useNavigate();

    useEffect(() => {

    //  console.log(localStorage.getItem("id"));
    //  console.log(localStorage.getItem("username"));
    //  console.log(localStorage.getItem("email"));
    //  console.log(localStorage.getItem("role"));


      setId(localStorage.getItem('id'));
      setUsername(localStorage.getItem('username'));
      setEmail(localStorage.getItem('email'));
      setRole(localStorage.getItem('role'));
    }, []);
  

    const onSubmit  = async (e) => {
      e.preventDefault();
      await axios.put(API_URL + id, { 
        username,
         email, 
         role 
        });
      navigate('/dashboard');
  };


    return (
      <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Create User
        </Typography>
        <form onSubmit={onSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth variant="outlined" required>
              <InputLabel>Role</InputLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                label="Role"
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Update
          </Button>
        </form>
      </Box>
    </Container>
    );
};

export default UpdateUser
