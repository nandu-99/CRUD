import React, { useState } from 'react';
import { createTable } from '../services/api';
import './styles.css'; 

const CreateTable = () => {
  const [tableName, setTableName] = useState('');
  const [columns, setColumns] = useState([{ name: '', type: '' }]);

  const handleCreateTable = async () => {
    try {
      await createTable(tableName, columns);
      alert(`Table ${tableName} created successfully`);
    } catch (error) {
      console.error("Error creating table", error);
      alert("Failed to create table");
    }
  };

  const handleColumnChange = (index, field, value) => {
    const updatedColumns = [...columns];
    updatedColumns[index][field] = value;
    setColumns(updatedColumns);
  };

  const addColumn = () => {
    setColumns([...columns, { name: '', type: '' }]);
  };

  return (
    <div className="create-table-container">
      <h2>Create Table</h2>
      <div className='create-table-name'>
        <input
          type="text"
          placeholder="Enter table name"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          className="input"
        />
      </div>
      {columns.map((column, index) => (
        <div key={index} className="column-inputs">
          <input
            type="text"
            placeholder="Column Name"
            value={column.name}
            onChange={(e) => handleColumnChange(index, 'name', e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="Column Type"
            value={column.type}
            onChange={(e) => handleColumnChange(index, 'type', e.target.value)}
            className="input"
          />
        </div>
      ))}
      <button onClick={addColumn} className="button">Add Column</button>
      <button onClick={handleCreateTable} className="button">Create Table</button>
    </div>
  );
};

export default CreateTable;
