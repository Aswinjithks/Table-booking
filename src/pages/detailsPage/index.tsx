import './tableDetails.scss';
import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

interface Table {
  id: number;
  tableName: string;
  description: string;
  tableType: string;
  seats: number;
}

const TableDetails: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const table = location.state as Table;

  const renderSeats = (seats: number, tableType: string) => {
    const seatElements: JSX.Element[] = [];
    const radius = 100; 
    const angles = [];

    for (let i = 0; i < seats; i++) {
      angles.push((360 / seats) * i);
    }

    angles.forEach((angle, index) => {
      const top = radius * Math.sin((angle * Math.PI) / 180) + radius + 40;
      const left = radius * Math.cos((angle * Math.PI) / 180) + radius + 40;

      seatElements.push(
        <div
          key={index}
          className="seat"
          style={{ top: `${top}px`, left: `${left}px` }}
        >
          {index + 1}
        </div>
      );
    });

    return <div className="seats-container">{seatElements}</div>;
  };

  if (!table) {
    return <div>Table not found</div>;
  }

  return (
    <div className="table-details">
      <h2>Table: {table.tableName}</h2>
      <p>Description: {table.description}</p>
      <div className={`table ${table.tableType}`}>
        {renderSeats(table.seats, table.tableType)}
      </div>
    </div>
  );
};

export default TableDetails;






