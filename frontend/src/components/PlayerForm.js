import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PlayerService from '../services/PlayerService';

function PlayerForm() {
  const { playerId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const isEditMode = !!playerId;

  const validationSchema = Yup.object({
    playerName: Yup.string()
      .min(2, 'Player name must be at least 2 characters')
      .max(100, 'Player name cannot exceed 100 characters')
      .required('Player name is required'),

    jerseyNumber: Yup.number()
      .min(0, 'Jersey number must be 0 or greater')
      .max(999, 'Jersey number cannot exceed 999')
      .required('Jersey number is required'),

    role: Yup.string()
      .oneOf(
        ['Batsman', 'Bowler', 'Keeper', 'All Rounder'],
        'Role must be Batsman, Bowler, Keeper or All Rounder'
      )
      .required('Role is required'),

    totalMatches: Yup.number()
      .min(0, 'Total matches cannot be negative')
      .nullable(),

    teamName: Yup.string()
      .required('Team name is required'),

    stateName: Yup.string()
      .required('State name is required'),

    description: Yup.string()
      .nullable(),
  });

  const formik = useFormik({
    initialValues: {
      playerName: '',
      jerseyNumber: '',
      role: '',
      totalMatches: '',
      teamName: '',
      stateName: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (isEditMode) {
        PlayerService.updatePlayer(playerId, values)
          .then(() => {
            navigate('/');
          })
          .catch((err) => {
            setError(
              err.response?.data?.message || 'Failed to update player.'
            );
          });
      }
      else {
        PlayerService.createPlayer(values)
          .then(() => {
            navigate('/');
          })
          .catch((err) => {
            setError(
              err.response?.data?.message || 'Failed to create player.'
            );
          });
      }
    },
  });

  useEffect(() => {
    if (isEditMode) {
      PlayerService.getPlayerById(playerId)
        .then((response) => {
          const player = response.data;
          formik.setValues({
            playerName: player.playerName,
            jerseyNumber: player.jerseyNumber,
            role: player.role,
            totalMatches: player.totalMatches,
            teamName: player.teamName,
            stateName: player.stateName,
            description: player.description || '',
          });
        })
        .catch(() => {
          setError('Failed to load player details.');
        });
    }
  }, [playerId]);

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow">
          <div className="card-header bg-success text-white">
            <h4 className="mb-0">
              {isEditMode ? 'Edit Player' : 'Add New Player'}
            </h4>
          </div>
          <div className="card-body">

            {error && (
              <div className="alert alert-danger alert-dismissible">
                {error}
                <button className="btn-close" onClick={() => setError('')}></button>
              </div>
            )}

            <form onSubmit={formik.handleSubmit}>

              <div className="mb-3">
                <label className="form-label fw-bold">Player Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.playerName && formik.errors.playerName
                      ? 'is-invalid'
                      : ''
                  }`}
                  name="playerName"
                  placeholder="Enter player name"
                  value={formik.values.playerName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.playerName && formik.errors.playerName && (
                  <div className="invalid-feedback">
                    {formik.errors.playerName}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Jersey Number</label>
                <input
                  type="number"
                  className={`form-control ${
                    formik.touched.jerseyNumber && formik.errors.jerseyNumber
                      ? 'is-invalid'
                      : ''
                  }`}
                  name="jerseyNumber"
                  placeholder="Enter jersey number (0-999)"
                  value={formik.values.jerseyNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.jerseyNumber && formik.errors.jerseyNumber && (
                  <div className="invalid-feedback">
                    {formik.errors.jerseyNumber}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Role</label>
                <select
                  className={`form-select ${
                    formik.touched.role && formik.errors.role
                      ? 'is-invalid'
                      : ''
                  }`}
                  name="role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select Role</option>
                  <option value="Batsman">Batsman</option>
                  <option value="Bowler">Bowler</option>
                  <option value="Keeper">Keeper</option>
                  <option value="All Rounder">All Rounder</option>
                </select>
                {formik.touched.role && formik.errors.role && (
                  <div className="invalid-feedback">
                    {formik.errors.role}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Total Matches</label>
                <input
                  type="number"
                  className={`form-control ${
                    formik.touched.totalMatches && formik.errors.totalMatches
                      ? 'is-invalid'
                      : ''
                  }`}
                  name="totalMatches"
                  placeholder="Enter total matches played"
                  value={formik.values.totalMatches}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.totalMatches && formik.errors.totalMatches && (
                  <div className="invalid-feedback">
                    {formik.errors.totalMatches}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Team Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.teamName && formik.errors.teamName
                      ? 'is-invalid'
                      : ''
                  }`}
                  name="teamName"
                  placeholder="Enter team name"
                  value={formik.values.teamName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.teamName && formik.errors.teamName && (
                  <div className="invalid-feedback">
                    {formik.errors.teamName}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">State Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.stateName && formik.errors.stateName
                      ? 'is-invalid'
                      : ''
                  }`}
                  name="stateName"
                  placeholder="Enter state name"
                  value={formik.values.stateName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.stateName && formik.errors.stateName && (
                  <div className="invalid-feedback">
                    {formik.errors.stateName}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  placeholder="Enter player description"
                  rows="3"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></textarea>
              </div>

              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-success"
                >
                  {isEditMode ? 'Update Player' : 'Add Player'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerForm;