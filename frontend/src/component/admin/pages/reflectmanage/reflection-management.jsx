import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../../backend/config/firebase';
import './reflection.css'; // Optional: add styles here
import { useNavigate } from 'react-router-dom';

function ReflectionManagement() {
  const [reflections, setReflections] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReflections = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'reflection_content'));
        const data = snapshot.docs.map(doc => {
          const reflection = doc.data();
          return {
            id: doc.id,
            ...reflection,
            // Convert Firestore timestamp to JS Date object
            date: reflection.date?.toDate ? reflection.date.toDate() : new Date(reflection.date),
          };
        });
        setReflections(data);
      } catch (err) {
        console.error('Error fetching reflections:', err);
      }
    };

    fetchReflections();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDateChange = (e) => {
    setFilterDate(e.target.value);
  };

  const filteredReflections = reflections.filter(reflection => {
    const matchesSearch =
      reflection.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reflection.year_section?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDate = filterDate
      ? new Date(reflection.date).toDateString() === new Date(filterDate).toDateString()
      : true;

    return matchesSearch && matchesDate;
  });

  return (
    <div className="reflection-container">
      <h2>Reflection Records</h2>
      <div className="controls">
        <div className="adn-controls">
          <input
            type="text"
            placeholder="Search by title or year section"
            value={searchQuery}
            onChange={handleSearch}
            className="adn-input"
          />
          <input
            type="date"
            value={filterDate}
            onChange={handleDateChange}
            className="adn-date"
          />
        </div>
      </div>
      <table className="reflection-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Date</th>
            <th>UID</th>
            <th>Name</th>
            <th>Year & Section</th>
            <th>Title</th>
            <th>Reflection</th>
            <th>Daily Prayer</th>
            <th>Read Gospel</th>
            <th>Used App Today</th>
            <th>Shared</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredReflections.map((ref, index) => (
            <tr key={ref.id}>
              <td>{index + 1}</td>
              <td>{ref.date.toISOString().split('T')[0]}</td>
              <td>{ref.uid || '-'}</td>
              <td>{ref.name || '-'}</td>
              <td>{ref.year_section || '-'}</td>
              <td>{ref.title || '-'}</td>
              <td>{ref.reflection || '-'}</td>
              <td>{ref.daily_prayer ? 'Yes' : 'No'}</td>
              <td>{ref.read_gospel_reflection ? 'Yes' : 'No'}</td>
              <td>{ref.used_app_today ? 'Yes' : 'No'}</td>
              <td>{ref.isShared ? 'Yes' : 'No'}</td>
              <td>
                <button className="adn-view-btn" onClick={() => navigate('/admin-dashboard/reflection-manager/reflection-viewer/' + ref.id)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReflectionManagement;
