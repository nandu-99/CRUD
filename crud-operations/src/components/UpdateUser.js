// src/components/UpdateUser.js
import React, { useState, useEffect } from 'react';
import { updateUser } from '../services/api';
import './styles.css';

const UpdateUser = ({ user, tableName, setShowUpdate, setSelectedUser }) => {
  const [updatedUser, setUpdatedUser] = useState({ name: '', email: '', age: '' });

  useEffect(() => {
    if (user) {
      setUpdatedUser({ name: user.name, email: user.email, age: user.age });
    }
  }, [user]);

  const handleUpdateUser = async () => {
    try {
      await updateUser(tableName, user.id, updatedUser);
      alert('User updated successfully');
      setShowUpdate(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error updating user", error);
      alert("Failed to update user");
    }
  };

  return (
    <div className="input-container">
      <h2>Update User</h2>
      <input
        className="input"
        type="text"
        placeholder="Name"
        value={updatedUser.name}
        onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
      />
      <input
        className="input"
        type="email"
        placeholder="Email"
        value={updatedUser.email}
        onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
      />
      <input
        className="input"
        type="number"
        placeholder="Age"
        value={updatedUser.age}
        onChange={(e) => setUpdatedUser({ ...updatedUser, age: e.target.value })}
      />
      <button className="button" onClick={handleUpdateUser}>Update User</button>
    </div>
  );
};

export default UpdateUser;
