import React, { useState } from 'react';
import { getTables } from '../services/api';
import './styles.css'; 

const ShowTables = () => {
  const [tables, setTables] = useState([]);

  const fetchTables = async () => {
    try {
      const tableList = await getTables();
      setTables(tableList);
    } catch (error) {
      console.error("Error fetching tables", error);
      alert("Failed to fetch tables");
    }
  };

  return (
    <div className="show-tables-container">
        <div className='table-name'>
            <h2>All Tables</h2>
            <button className="table-button" onClick={fetchTables}>
                Fetch Tables
            </button>
        </div>
      <ul className="table-list">
        {tables.map((table, index) => (
          <li key={index} className="table-item">
            {table}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowTables;
