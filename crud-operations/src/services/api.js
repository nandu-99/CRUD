import axios from 'axios';

const API_BASE_URL = "https://crud-one-murex.vercel.app";

// Create a new table with specified columns and their types
export const createTable = (tableName, columns) => {
  return axios.post(`${API_BASE_URL}/createTable`, { tableName, columns });
};

// Create a new user in a specified table
export const createUser = (userData, tableName) => {
  return axios.post(`${API_BASE_URL}/create/${tableName}`, userData);
};

// Get all tables
export const getTables = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tables`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tables:', error);
    throw error;
  }
};

// Get users from a specified table
export const getUsers = (tableName) => {
  return axios.get(`${API_BASE_URL}/get/${tableName}`);
};

// Delete a user from a specified table
export const deleteUser = (tableName, id) => {
  return axios.delete(`${API_BASE_URL}/delete/${tableName}/${id}`);
};

// Update a user in a specified table
export const updateUser = (tableName, id, userData) => {
  return axios.put(`${API_BASE_URL}/update/${tableName}/${id}`, userData);
};

// Truncate a table (clear all data in the table)
export const truncateTable = (tableName) => {
  return axios.post(`${API_BASE_URL}/truncateTable`, { tableName });
};

// Delete a table completely
export const deleteTable = (tableName) => {
  return axios.delete(`${API_BASE_URL}/deleteTable/${tableName}`);
};

// Fetch columns of a specified table
export const getTableColumns = (tableName) => {
  return axios.get(`${API_BASE_URL}/getColumns/${tableName}`);
};

// Alter a table by performing a specified operation (e.g., ADD, DROP, MODIFY)
export const alterTable = (tableName, operation, columnName, columnType) => {
  return axios.post(`${API_BASE_URL}/alterTable`, { tableName, operation, columnName, columnType });
};

