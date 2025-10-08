import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Flower from './Pages/flower';
import Addflower from './Pages/Addflower';
import Navbar from './Components/navbar';
import Footer from './Components/Footer';
import axios from 'axios';

const App = () => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const response = await axios.get('/api/flowers');
        setFlowers(response.data);
      } catch (error) {
        console.error('Error fetching flowers:', error);
      }
    };

    fetchFlowers();
  }, []);

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/flowers" />} />
        <Route path="/flowers" element={<Flower flowers={flowers} />} />
        <Route path="/add" element={<Addflower />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
