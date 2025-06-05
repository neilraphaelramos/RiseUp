import './settings.css';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { authUser } from '../../../../backend/config/firebase';

function SettingAdmin() {
    const navigate = useNavigate();

    const handleLogout = async () =>  {
        try {
            await signOut(authUser);
            localStorage.removeItem('userRole');
            navigate('/')
        } catch (error) {
          console.error('Logout failed', error.message);  
        };
    }

  return (
    <div className="admin-settings">
      <h2 className="settings-title">Admin Settings</h2>

      <div className="settings-section">
        <h3>Profile Info</h3>
        <div className="settings-item">
          <label>Full Name:</label>
          <input type="text" placeholder="Enter full name" />
        </div>
        <div className="settings-item">
          <label>Email:</label>
          <input type="email" placeholder="Enter email" />
        </div>
      </div>

      <div className="settings-section">
        <h3>Change Password</h3>
        <div className="settings-item">
          <label>Current Password:</label>
          <input type="password" />
        </div>
        <div className="settings-item">
          <label>New Password:</label>
          <input type="password" />
        </div>
        <div className="settings-item">
          <label>Confirm New Password:</label>
          <input type="password" />
        </div>
        <button className="settings-btn">Update Password</button>
      </div>

      <div className="settings-section">
        <h3>Other</h3>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default SettingAdmin;
