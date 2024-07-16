import './tableCard.scss';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Table {
  id: number;
  tableName: string;
  description: string;
  tableType: string;
  seats: number;
}

interface TableCardProps {
  table: Table;
}

const TableCard: React.FC<TableCardProps> = ({ table }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/table/${table.id}`, { state: table });
  };

  return (
    <div className="card shadow" onClick={handleClick}>
      <h3>{table.tableName}</h3>
      <p>Description: {table.description}</p>
      <p>Type: {table.tableType}</p>
      <p>Seats: {table.seats}</p>
      {/* {table.tableType === "rounded" ? <img src='' /> : <img src='' />} */}
    </div>
  );
};

export default TableCard;





