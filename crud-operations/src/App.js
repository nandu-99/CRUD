import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateUser from './components/CreateUser';
import UserList from './components/UserList';
import './components/styles.css';
import CreateTable from './components/CreateTable';
import DeleteTable from './components/DeleteTable';
import ShowTables from './components/ShowTables';
import AlterTable from './components/AlterTable';

function Home() {
  return (
    <div className="Home-container">
      <h1>TableTrack</h1>
      <div className="button-container">
        <Link to="/table-operations">
          <button className="button">Table Operations</button>
        </Link>
        <Link to="/row-operations">
          <button className="button">Row Operations</button>
        </Link>
      </div>
    </div>
  );
}

function TableOperations() {
  return (
    <div className="container">
      <div className='flex'>
        <h1>Table Operations</h1>
        <Link to="/row-operations">
          <button className="button">Row Operations</button>
        </Link>
      </div>
      
      <ShowTables />
      <CreateTable />
      <AlterTable />
      <DeleteTable />
    </div>
  );
}

function RowOperations() {
  return (
    <div className="container">
      <div className='flex'>
        <h1>Row Operations</h1>
        <Link to="/table-operations">
          <button className="button">Table Operations</button>
        </Link>
      </div>
      <CreateUser />
      <UserList />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table-operations" element={<TableOperations />} />
        <Route path="/row-operations" element={<RowOperations />} />
      </Routes>
    </Router>
  );
}

export default App;
