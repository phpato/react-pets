import React from 'react';
import InfoCliente from './components/WheaterLocation'
import Navbar from './components/Navbar'
import logo from './logo.svg';
import './App.css';

function App() {
  return (

    <div className="App">
      <Navbar/>
      <br></br>
      <div className = "container-fluid">

          <InfoCliente />
      
      </div>
      
    </div>
  );
}

export default App;
