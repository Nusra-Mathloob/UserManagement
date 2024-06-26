// src/components/Create.js
import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../Constants/Url';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const Create = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('user');
    const navigate = useNavigate();

    const onSubmit  = async (e) => {
        e.preventDefault();
        await axios.post(API_URL, { 
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
              Create
            </Button>
          </form>
        </Box>
      </Container>
    );
};

export default Create;
