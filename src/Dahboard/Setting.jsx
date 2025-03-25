import React, { useState } from 'react';
import { 
  Settings, 
  Bell, 
  Eye, 
  Moon, 
  Sun, 
  Grid, 
  List, 
  Save, 
  Clock,
  AlertCircle
} from 'lucide-react';
import '../Dahboard/DashStyle/Setting.css'; // Import the CSS file

const DashboardSettings = () => {
  const [activeTab, setActiveTab] = useState('appearance');
  const [theme, setTheme] = useState('light');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [dataRefreshRate, setDataRefreshRate] = useState('30');
  const [layout, setLayout] = useState('grid');
  const [showSaved, setShowSaved] = useState(false);

  const handleSaveSettings = () => {
    // Here you would typically save settings to backend or localStorage
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <Settings className="h-5 w-5 text-blue-600" />
        <h2>Dashboard Settings</h2>
      </div>

      {/* Settings tabs */}
      <div className="settings-tabs">
        <button 
          className={`tab-button ${activeTab === 'appearance' ? 'active' : ''}`}
          onClick={() => setActiveTab('appearance')}
        >
          <Eye className="h-4 w-4" />
          <span>Appearance</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          <Bell className="h-4 w-4" />
          <span>Notifications</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'data' ? 'active' : ''}`}
          onClick={() => setActiveTab('data')}
        >
          <Clock className="h-4 w-4" />
          <span>Data Settings</span>
        </button>
      </div>

      {/* Appearance settings */}
      {activeTab === 'appearance' && (
        <div className="tab-content">
          <div className="settings-section">
            <h3>Theme</h3>
            <div className="option-cards">
              <label className={`option-card ${theme === 'light' ? 'selected' : ''}`}>
                <Sun className="text-yellow-500" />
                <span>Light</span>
                <input 
                  type="radio" 
                  name="theme" 
                  value="light"
                  checked={theme === 'light'}
                  onChange={() => setTheme('light')}
                  className="sr-only"
                />
              </label>

              <label className={`option-card ${theme === 'dark' ? 'selected' : ''}`}>
                <Moon className="text-indigo-600" />
                <span>Dark</span>
                <input 
                  type="radio" 
                  name="theme" 
                  value="dark"
                  checked={theme === 'dark'}
                  onChange={() => setTheme('dark')}
                  className="sr-only"
                />
              </label>

              <label className={`option-card ${theme === 'system' ? 'selected' : ''}`}>
                <Settings className="text-gray-600" />
                <span>System</span>
                <input 
                  type="radio" 
                  name="theme" 
                  value="system"
                  checked={theme === 'system'}
                  onChange={() => setTheme('system')}
                  className="sr-only"
                />
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3>Layout</h3>
            <div className="option-cards">
              <label className={`option-card ${layout === 'grid' ? 'selected' : ''}`}>
                <Grid className="text-blue-600" />
                <span>Grid</span>
                <input 
                  type="radio" 
                  name="layout" 
                  value="grid"
                  checked={layout === 'grid'}
                  onChange={() => setLayout('grid')}
                  className="sr-only"
                />
              </label>

              <label className={`option-card ${layout === 'list' ? 'selected' : ''}`}>
                <List className="text-blue-600" />
                <span>List</span>
                <input 
                  type="radio" 
                  name="layout" 
                  value="list"
                  checked={layout === 'list'}
                  onChange={() => setLayout('list')}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Notification settings */}
      {activeTab === 'notifications' && (
        <div className="tab-content">
          <div className="settings-section">
            <h3>Push Notifications</h3>
            <div className="toggle-option">
              <div className="toggle-option-text">
                <p>Enable Notifications</p>
                <p>Receive alerts about sales, inventory and customer activity</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notificationsEnabled} 
                  onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <div className="settings-section">
            <h3>Email Alerts</h3>
            <div className="toggle-option">
              <div className="toggle-option-text">
                <p>Daily Summary</p>
                <p>Receive a daily email with your store performance</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={emailAlerts} 
                  onChange={() => setEmailAlerts(!emailAlerts)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Data settings */}
      {activeTab === 'data' && (
        <div className="tab-content">
          <div className="settings-section">
            <h3>Data Refresh Rate</h3>
            <div className="toggle-option">
              <p className="toggle-option-text">
                <p>How often should the dashboard update with new data</p>
              </p>
              <div className="select-wrapper">
                <select
                  value={dataRefreshRate}
                  onChange={(e) => setDataRefreshRate(e.target.value)}
                  className="select-dropdown"
                >
                  <option value="60">Every 60 minutes</option>
                  <option value="30">Every 30 minutes</option>
                  <option value="15">Every 15 minutes</option>
                  <option value="5">Every 5 minutes</option>
                  <option value="1">Real-time (1 minute)</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="settings-section">
            <h3>Data Timeframe</h3>
            <div className="timeframe-buttons">
              <button className="timeframe-button active">Last Week</button>
              <button className="timeframe-button">Last Month</button>
              <button className="timeframe-button">Last Quarter</button>
            </div>
          </div>
        </div>
      )}

      {/* Save button */}
      <div className="save-button-container">
        <button 
          onClick={handleSaveSettings}
          className="save-button"
        >
          <Save className="h-4 w-4" />
          Save Settings
        </button>
      </div>

      {/* Saved notification */}
      {showSaved && (
        <div className="toast-notification">
          <AlertCircle className="h-5 w-5" />
          Settings saved successfully!
        </div>
      )}
    </div>
  );
};

export default DashboardSettings;