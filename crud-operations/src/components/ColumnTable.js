import './styles.css';

const ColumnTable = ({ columns }) => (
  columns?.length > 0 && (
    <div>
      <h3>Columns</h3>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {columns?.map((column, index) => (
            <tr key={index}>
              <td>{column?.name}</td>
              <td>{column?.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
);

export default ColumnTable;
