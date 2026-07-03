import React, { useState } from 'react';
import PlayerService from '../services/PlayerService';

function PlayerSearch() {
  const [stateName, setStateName] = useState('');
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!stateName.trim()) {
      setError('Please enter a state name to search.');
      return;
    }
    setError('');
    setSearched(false);

    PlayerService.getPlayersByState(stateName)
      .then((response) => {
        setPlayers(response.data);
        setSearched(true);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setError(`No players found for state: ${stateName}`);
        } else {
          setError('Something went wrong. Please try again.');
        }
        setPlayers([]);
        setSearched(true);
      });
  };

  const handleClear = () => {
    setStateName('');
    setPlayers([]);
    setError('');
    setSearched(false);
  };

  return (
    <div>
      <h2 className="mb-4 text-success fw-bold">Search Players by State</h2>

      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="row g-2 align-items-end">
            <div className="col-md-8">
              <label className="form-label fw-bold">State Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter state name (e.g. Tamil Nadu)"
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-success w-100"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-secondary w-100"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {searched && players.length > 0 && (
        <div>
          <h5 className="text-muted mb-3">
            Found {players.length} player(s) for state: <strong>{stateName}</strong>
          </h5>
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
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
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
                    <td>{player.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {searched && players.length === 0 && !error && (
        <div className="alert alert-warning">
          No players found for state: {stateName}
        </div>
      )}
    </div>
  );
}

export default PlayerSearch;