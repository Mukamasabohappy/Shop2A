import React, { useState, useEffect } from 'react';
import '../Dahboard/DashStyle/Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faSave } from '@fortawesome/free-solid-svg-icons';

function Profile() {
  const [user, setUser] = useState({
    id: 1,
    name: 'm Happy',
    email: 'mukamasaboh@gmail.com',
    // Other profile fields
  });
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Simulate fetching user data from an API
    // Replace this with your actual API call
    setTimeout(() => {
      setUser({
        id: 1,
        name: 'M Happy',
        email: 'mukamasaboh@gmail.com',
      });
      setEditedName('M Happy');
      setEditedEmail('mukamasaboh@gmail.com');
    }, 500);
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setEditedName(user.name); // Revert changes
    setEditedEmail(user.email);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEditedEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate API call to update profile
    try {
      // Basic email validation
      if (!editedEmail.includes('@')) {
        setErrorMessage('Invalid email format');
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

      setUser({
        ...user,
        name: editedName,
        email: editedEmail,
      });

      setEditMode(false);
      setSuccessMessage('Profile updated successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('Failed to update profile. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Your Profile</h2>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {editMode ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="name">
              <FontAwesomeIcon icon={faUser} className="form-icon" />
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={editedName}
              onChange={handleNameChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} className="form-icon" />
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={editedEmail}
              onChange={handleEmailChange}
              className="form-control"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button">
              <FontAwesomeIcon icon={faSave} className="button-icon" />
              Save
            </button>
            <button type="button" className="cancel-button" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-info">
          <div className="info-item">
            <FontAwesomeIcon icon={faUser} className="info-icon" />
            <span>{user.name}</span>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faEnvelope} className="info-icon" />
            <span>{user.email}</span>
          </div>
          <button className="edit-button" onClick={handleEditClick}>
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;