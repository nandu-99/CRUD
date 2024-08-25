import React, { useState, useEffect } from 'react';
import { createUser, getTableColumns } from '../services/api';
import './styles.css';

const CreateUser = () => {
  const [user, setUser] = useState({});
  const [tableName, setTableName] = useState('');
  const [columns, setColumns] = useState([]);
  const [fetchColumns, setFetchColumns] = useState(false); 

  useEffect(() => {
    if (fetchColumns && tableName) {
      const fetchColumnsData = async () => {
        try {
          const cols = await getTableColumns(tableName);
          const columnNames = cols.data.map(col => col.name);
          setColumns(columnNames);
          setUser(columnNames.reduce((acc, col) => ({ ...acc, [col]: '' }), {})); // Initialize user state with column names as keys
          setFetchColumns(false);
        } catch (error) {
          console.error("Error fetching table columns", error);
          alert("Failed to fetch table columns");
        }
      };
  
      fetchColumnsData();
    }
  }, [fetchColumns, tableName]);
  
  const handleFetchColumns = () => {
    if (tableName) {
      setFetchColumns(true);
    } else {
      alert("Please enter a table name");
    }
  };

  const handleCreateUser = async () => {
    try {
      await createUser(user, tableName);
      alert('User created successfully');
      setUser({});
      setTableName('');
      setColumns([]);
    } catch (error) {
      console.error("Error creating user", error);
      alert("Failed to create user");
    }
  };

  return (
    <div className="input-container">
      <h2>Create Row in table</h2>
      <div className='input-div'>
        <div className='table-name'>
          <input
            className="input"
            type="text"
            placeholder="Table Name"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
          />
          <button className="create-button" onClick={handleFetchColumns}>Fetch Columns</button>
        </div>
        <div className='other-content'>
          {columns?.map((col) => (
            <input
              key={col}
              className="input"
              type="text"
              placeholder={col}
              value={user[col] || ''}
              onChange={(e) => setUser({ ...user, [col]: e.target.value })}
            />
          ))}
          {columns?.length>0 && <button className="create-button" onClick={handleCreateUser}>Create User</button>}
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
