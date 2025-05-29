import React, { useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://warehouse.apnimandi.us/api/api/admin/users', { name, password, role });
      alert('User created successfully');
    } catch (error) {
      alert('Failed to create user');
    }
  };

  return (
    <div className="form-container">
      <h2>Create User</h2>
      <form onSubmit={handleCreateUser}>
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default UserManagement;