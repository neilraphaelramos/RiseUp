import './settings.css';
import { signOut } from 'firebase/auth';
import { Outlet, useNavigate } from 'react-router-dom';
import { authUser } from '../../../../backend/config/firebase';
import { FaInfoCircle } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";

function SettingAdmin() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(authUser);
      localStorage.removeItem('userRole');
      navigate('/')
    } catch (error) {
      console.error('Logout failed', error.message);
    };
  }

  return (
    <div className='adn-main-setting-container'>
      <div className="admin-settings">
        <h2 className="settings-title">Admin Settings</h2>
        <div className='adn-setting-layout'>
          <div className='adn-sidebar-setting'>
            <div className='adn-setting-group-btn'>
              <div className='adn-btn' onClick={() => navigate('/admin-dashboard/settings/account-info')}>
                <FaInfoCircle className='adn-setting-icon' /> Account Info
              </div>
            </div>
            <div className='adn-setting-group-btn'>
              <div className='adn-btn' onClick={() => navigate('/admin-dashboard/settings/account-management')}>
                <LuUsers className='adn-setting-icon' /> Account Management
              </div>
            </div>
            <div className="adn-setting-group-btn">
              <div className='adn-btn' onClick={handleLogout}>
                <CiLogout className='adn-setting-icon' /> Logout
              </div>
            </div>
          </div>
          <div className='adn-setting-display'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingAdmin;
