import './tableModal.scss';
import React, { useState } from 'react';

interface TableModalProps {
    addTable: (table: Table | null) => void;
    existingTableNames: string[];
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Table {
    id: number;
    tableName: string;
    description: string;
    seats: number;
    tableType: 'square' | 'rounded'; 
}

const TableModal: React.FC<TableModalProps> = ({ addTable, existingTableNames, setShowModal }) => {
    const [formData, setFormData] = useState({
        id: Date.now(),
        tableName: '',
        description: '',
        seats: 1,
        tableType: 'square'
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: name === 'seats' ? parseInt(value, 10) : value }));
    };

    const handleSubmit = () => {
        setError(null);
        if (!formData.tableName || !formData.description || !formData.seats) {
            setError('Please fill in all fields');
            return;
        }
        if (existingTableNames.includes(formData.tableName)) {
            setError('Table name already exists');
            return;
        }
        addTable(formData as Table);
        setShowModal(false);
    };

    const handleSeatChange = (increment: number) => {
        setFormData((prev) => {
            const newSeats = prev.seats + increment;
            if (newSeats > 12 || newSeats < 1) {
                setError('Seats must be between 1 and 12');
                return prev;
            }
            setError(null);
            return { ...prev, seats: newSeats };
        });
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close" onClick={() => setShowModal((prev) => !prev)}>
                    X
                </button>
                <h2>Create Table</h2>
                <input
                    type="text"
                    name="tableName"
                    placeholder="Table Name"
                    value={formData.tableName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <div className="seats">
                    <label>No. of seats</label>
                    <button onClick={() => handleSeatChange(1)}>+</button>
                    <span>{formData.seats}</span>
                    <button onClick={() => handleSeatChange(-1)}>-</button>
                </div>
                <div className="table-type">
                    <label>Table design:</label>
                    <div className="table-options">
                        <input
                            type="radio"
                            id="square"
                            name="tableType"
                            value="square"
                            checked={formData.tableType === 'square'}
                            onChange={handleChange}
                        />
                        <label htmlFor="square" className="table-square"></label>
                        <input
                            type="radio"
                            id="rounded"
                            name="tableType"
                            value="rounded"
                            checked={formData.tableType === 'rounded'}
                            onChange={handleChange}
                        />
                        <label htmlFor="rounded" className="table-rounded"></label>
                    </div>
                </div>
                <button className="submit" onClick={handleSubmit}>
                    Submit
                </button>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default TableModal;





