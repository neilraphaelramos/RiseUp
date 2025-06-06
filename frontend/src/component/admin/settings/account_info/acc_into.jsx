import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { authUser, db } from '../../../../../backend/config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import './acc_info.css';

function Acc_Info() {
  const [adminInfo, setAdminInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authUser, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users_info', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setAdminInfo(userDoc.data());
          } else {
            console.log('No user document found');
          }
        } catch (error) {
          console.error('Error fetching admin info:', error);
        }
      } else {
        setAdminInfo(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="acc-info-container">Loading account information...</div>;
  }

  if (!adminInfo) {
    return <div className="acc-info-container">No account information available.</div>;
  }

  return (
    <div className='adn-main-info-container'>
          <div className="acc-info-container">
              <h2>Account Information</h2>
              <div className="acc-info-field"><strong>Name:</strong> {adminInfo.name}</div>
              <div className="acc-info-field"><strong>Username:</strong> {adminInfo.username}</div>
              <div className="acc-info-field"><strong>Email:</strong> {adminInfo.email}</div>
              <div className="acc-info-field"><strong>Role:</strong> {adminInfo.role}</div>
          </div>
    </div>
  );
}

export default Acc_Info;
