import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import MainPage from '@pages/mainPage';
import TableDetails from '@pages/detailsPage';
import { ToastContainer,toast } from 'react-toastify';


function App() {
  return (
    <Router>
      <div>
      <ToastContainer
        closeOnClick
        style={{ width: "auto", minWidth: "340px", maxWidth: "450px" }}
        position={'bottom-right'}
        bodyStyle={{ color: "#756f86" }}
      />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/table/:id" element={<TableDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;




