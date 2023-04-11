import React from 'react';
import ToursList from './components/ToursList';
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';

import '@coreui/coreui/dist/css/coreui.min.css'


function App() {
  return (
    <Router>
        <div>
          <Navbar />
          <ToursList />
        </div>
    </ Router>
  );
}

export default App;
