import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlayerList from './components/PlayerList';
import PlayerForm from './components/PlayerForm';
import PlayerSearch from './components/PlayerSearch';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
          <div className="container">
            <span className="navbar-brand fw-bold">
              Cricket Team Management
            </span>
            <div className="navbar-nav ms-auto">
              <Link className="nav-link text-white" to="/">Home</Link>
              <Link className="nav-link text-white" to="/add">Add Player</Link>
              <Link className="nav-link text-white" to="/search">Search by State</Link>
            </div>
          </div>
        </nav>
        
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<PlayerList />} />
            <Route path="/add" element={<PlayerForm />} />
            <Route path="/edit/:playerId" element={<PlayerForm />} />
            <Route path="/search" element={<PlayerSearch />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;