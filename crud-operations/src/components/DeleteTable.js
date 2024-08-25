import React, { useState } from 'react';
import { deleteTable, truncateTable } from '../services/api'; 
import './styles.css'; 

const DeleteTable = () => {
  const [tableName, setTableName] = useState('');

  const handleDeleteTable = async () => {
    try {
      await deleteTable(tableName);
      alert(`Table ${tableName} deleted successfully`);
    } catch (error) {
      console.error("Error deleting table", error);
      alert("Failed to delete table");
    }
  };

  const handleTruncateTable = async () => {
    try {
      await truncateTable(tableName);
      alert(`Table ${tableName} truncated successfully`);
    } catch (error) {
      console.error("Error truncating table", error);
      alert("Failed to truncate table");
    }
  };

  return (
    <div className="delete-table-container">
      <h2>Delete or Truncate Table</h2>
      <div className='delete-table-name'>
        <input
          type="text"
          placeholder="Enter table name"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          className="input"
        />
      </div>
      <button onClick={handleTruncateTable} className="button">Truncate Table</button>
      <button onClick={handleDeleteTable} className="button">Delete Table</button>
    </div>
  );
};

export default DeleteTable;
