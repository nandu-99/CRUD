import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../services/api';
import './styles.css';
import UpdateUser from './UpdateUser';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const [tableName, setTableName] = useState('');
  const [loading, setLoading] = useState(false);

  console.log(users)

  const fetchUsers = async () => {
    if (tableName) {
      setLoading(true); 
      try {
        const response = await getUsers(tableName);
        console.log(response)
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
        alert("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = async (id) => {
    if (tableName) {
      try {
        await deleteUser(tableName, id);
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error("Error deleting user", error);
        alert("Failed to delete user");
      }
    }
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setShowUpdate(true);
  };

  const handleTableNameChange = (e) => {
    setTableName(e.target.value);
  };

  const handleFetchUsers = () => {
    fetchUsers();
  };

  const getTableHeaders = () => {
    if (users?.length > 0) {
      const firstUser = users[0];
      return Object.keys(firstUser);
    }
    return [];
  };

  return (
    <div className="user-list-container">
      <h2>Complete Table Data</h2>
      <div className='user-list-input'>
        <input
          className="input"
          type="text"
          placeholder="Enter Table Name"
          value={tableName}
          onChange={handleTableNameChange}
        />
        <button className="button" onClick={handleFetchUsers}>Fetch</button>
      </div>
      {tableName && (
        <>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <>
              <table className="table">
                <thead>
                  <tr>
                    {getTableHeaders().map((header) => (
                      <th key={header}>{header}</th>
                    ))}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user) => (
                    <tr key={user.id}>
                      {getTableHeaders().map((header) => (
                        <td key={header}>{user[header]}</td>
                      ))}
                      <td>
                        <button className="button" onClick={() => handleUpdate(user)}>Update</button>
                        <button className="button" onClick={() => handleDelete(user.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {showUpdate && (
                <UpdateUser
                  user={selectedUser}
                  tableName={tableName}
                  setShowUpdate={setShowUpdate}
                  setSelectedUser={setSelectedUser}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UserList;
