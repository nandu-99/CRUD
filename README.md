# CRUD Application

This is a simple CRUD (Create, Read, Update, Delete) application built with [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), and [React](https://reactjs.org/). This project provides a basic example of how to set up and manage a CRUD interface with a RESTful API and a front-end application.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Front-end](#front-end)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create, Read, Update, and Delete records.
- RESTful API with Express for backend operations.
- React frontend to interact with the API.
- Data persistence with a MySQL database.
- Dynamic table management.

## Installation

### Backend

1. Clone the repository:

   ```bash
   git clone https://github.com/nandu-99/CRUD.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables. Create a `.env` file in the backend directory with the following content:

   ```env
   SQL_DB_HOST= ""
   SQL_DB_USERNAME=""
   SQL_DB_PASSWORD=""
   SQL_DB_DATABASENAME=""
   PORT=""
   ```

4. Start the server:

   ```bash
   node index.js
   ```

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd crud-operations
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React application:

   ```bash
   npm start
   ```

### Update `api.js` in `services`

1. Locate your `api.js` file in the `services` directory.
2. Change the `API_BASE_URL` to:

   ```javascript
   const API_BASE_URL = `http://localhost:${PORT}`;
   ```

   Make sure to replace `${PORT}` with your actual port number.

## Usage

1. Start both the backend and frontend servers.
2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the React frontend.
3. Use the provided UI to interact with the CRUD operations.

## API Endpoints

### Table Operations

- **Show All Tables**: Retrieves and displays all tables present in the database.
- **Create Table**: Creates a new table with the specified table name and columns.
- **Alter Table**: Modifies an existing table according to the specified changes.
- **Fetch Columns**: Shows all the columns present in a specified table.
- **Truncate Table**: Removes all data from a table while keeping the table structure intact.
- **Delete Table**: Deletes the entire table, including its structure and data.

### Row Operations

- **Create Row in Table**: Adds a new row of data to a specified table.
- **Complete Table Data**: Retrieves and displays all data from a specified table.

## Front-end

The frontend is built with React and includes components for listing, creating, updating, and deleting items.

## Contributing

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature/YourFeature
   ```

3. Commit your changes:

   ```bash
   git commit -am 'Add new feature'
   ```

4. Push to the branch:

   ```bash
   git push origin feature/YourFeature
   ```

5. Create a new Pull Request.




