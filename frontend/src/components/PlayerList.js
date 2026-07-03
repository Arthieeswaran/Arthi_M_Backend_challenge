import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PlayerService from '../services/PlayerService';

function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = () => {
    PlayerService.getAllPlayers()
      .then((response) => {
        setPlayers(response.data);
      })
      .catch((error) => {
        setError('Failed to load players. Make sure backend is running.');
      });
  };

  const deletePlayer = (playerId) => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      PlayerService.deletePlayer(playerId)
        .then(() => {
          setMessage('Player deleted successfully!');
          loadPlayers();
        })
        .catch(() => {
          setError('Failed to delete player.');
        });
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-success fw-bold">Players List</h2>

      {message && (
        <div className="alert alert-success alert-dismissible">
          {message}
          <button className="btn-close" onClick={() => setMessage('')}></button>
        </div>
      )}

      {error && (
        <div className="alert alert-danger alert-dismissible">
          {error}
          <button className="btn-close" onClick={() => setError('')}></button>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-success">
            <tr>
              <th>Player ID</th>
              <th>Player Name</th>
              <th>Jersey Number</th>
              <th>Role</th>
              <th>Total Matches</th>
              <th>Team Name</th>
              <th>State</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No players found. Click Add Player to add one!
                </td>
              </tr>
            ) : (
              players.map((player) => (
                <tr key={player.playerId}>
                  <td>{player.playerId}</td>
                  <td>{player.playerName}</td>
                  <td>{player.jerseyNumber}</td>
                  <td>
                    <span className="badge bg-success">{player.role}</span>
                  </td>
                  <td>{player.totalMatches}</td>
                  <td>{player.teamName}</td>
                  <td>{player.stateName}</td>
                  <td>
                    <Link
                      to={`/edit/${player.playerId}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deletePlayer(player.playerId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Link to="/add" className="btn btn-success mt-2">
        Add New Player
      </Link>
    </div>
  );
}

export default PlayerList;