import React, { useState, useEffect } from 'react';
import { updateUser, getTableColumns } from '../services/api';
import './styles.css';

const UpdateUser = ({ user, tableName, setShowUpdate, setSelectedUser }) => {
  const [updatedUser, setUpdatedUser] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const fetchColumnsData = async () => {
      try {
        const cols = await getTableColumns(tableName);
        const columnNames = cols.data.map(col => col.name);
        setColumns(columnNames);
        setUpdatedUser(cols.data.reduce((acc, col) => ({ ...acc, [col.name]: user[col.name] || '' }), {}));
      } catch (error) {
        console.error("Error fetching table columns", error);
        alert("Failed to fetch table columns");
      }
    };

    if (tableName) {
      fetchColumnsData();
    }
  }, [tableName, user]);

  useEffect(() => {
    if (user) {
      setUpdatedUser(user);
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
      <h2>Update Row</h2>
      <div className='other-content'>
        {columns.map((col) => (
          <input
            key={col}
            className="input"
            type="text"
            placeholder={col}
            value={updatedUser[col] || ''}
            onChange={(e) => setUpdatedUser({ ...updatedUser, [col]: e.target.value })}
          />
        ))}
      </div>
      <button className="button" onClick={handleUpdateUser}>Update User</button>
    </div>
  );
};

export default UpdateUser;
