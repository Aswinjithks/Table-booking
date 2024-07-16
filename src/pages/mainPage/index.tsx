import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import TableCard from '../../components/card'
import TableModal from '../../components/addmodal';
import './main.scss';

interface Table {
  id: number;
  tableName: string;
  description: string;
  seats: number;
  tableType: 'square' | 'rounded';
}

const MainPage: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedTables = localStorage.getItem('tables');
    if (savedTables) {
      setTables(JSON.parse(savedTables));
    }
  }, []);

  const addTable = (table: Table | null) => {
    if (table) {
      const updatedTables = [...tables, table];
      setTables(updatedTables);
      localStorage.setItem('tables', JSON.stringify(updatedTables));
      toast.success('Table added successfully!');
    }else{
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="main-page">
      <button className='add-table' onClick={() => setShowModal(true)}>Create Table</button>
      {showModal && <TableModal addTable={addTable} setShowModal={setShowModal} existingTableNames={tables.map(table => table.tableName)} />}
      <div className="table-list">
        {tables.map((table, index) => (
          <TableCard key={table.id} table={table} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;






