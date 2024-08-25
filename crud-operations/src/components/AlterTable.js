import React, { useState, useEffect } from 'react';
import { alterTable, getTableColumns } from '../services/api';
import './styles.css';
import ColumnTable from './ColumnTable';

const AlterTable = () => {
  const [tableName, setTableName] = useState('');
  const [columns, setColumns] = useState([]);
  const [newColumnName, setNewColumnName] = useState('');
  const [columnType, setColumnType] = useState('VARCHAR(255)'); 
  const [operation, setOperation] = useState('ADD');
  const [fetchColumns, setFetchColumns] = useState(false);

  useEffect(() => {
    if (fetchColumns && tableName) {
      const fetchColumnsData = async () => {
        try {
          const cols = await getTableColumns(tableName);
          setColumns(cols.data);
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

  const handleAlterTable = async () => {
    try {
      await alterTable(tableName, operation, newColumnName, columnType);
      alert(`Table altered successfully with operation: ${operation}`);
      setNewColumnName('');
      setColumnType('VARCHAR(255)'); 
    } catch (error) {
      console.error("Error altering table", error);
      alert("Failed to alter table");
    }
  };

  return (
    <div className="input-container">
      <h2>Alter Table</h2>
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
        {columns?.length > 0 && (
            <ColumnTable  columns={columns} />
        )}
        <div className='other-content'>
          <select className="input" value={operation} onChange={(e) => setOperation(e.target.value)}>
            <option value="ADD">ADD</option>
            <option value="DROP">DROP</option>
            <option value="MODIFY">MODIFY</option>
          </select>
          <input
                className="input"
                type="text"
                placeholder="New Column Name"
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
              />
          {operation !== 'DROP' && (
            <>
              <input
                className="input"
                type="text"
                placeholder="Column Type"
                value={columnType}
                onChange={(e) => setColumnType(e.target.value)}
              />
            </>
          )}
          <button className="create-button" onClick={handleAlterTable}>Alter Table</button>
        </div>
      </div>
    </div>
  );
};

export default AlterTable;
