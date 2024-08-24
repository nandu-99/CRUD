// src/App.js
import React, { useState } from 'react';
import CreateUser from './components/CreateUser';
import UserList from './components/UserList';
import './components/styles.css';
import CreateTable from './components/CreateTable';
import DeleteTable from './components/DeleteTable';

function App() {
  const [tableName, setTableName] = useState('');

  const handleTableNameChange = (e) => {
    setTableName(e.target.value);
  };

  return (
    <div className="container">
      <h1>User Management System</h1>
      <CreateTable  tableName={tableName} />
      <DeleteTable tableName={tableName}/>
      <CreateUser tableName={tableName} />
      <UserList tableName={tableName} />
    </div>
  );
}

export default App;
