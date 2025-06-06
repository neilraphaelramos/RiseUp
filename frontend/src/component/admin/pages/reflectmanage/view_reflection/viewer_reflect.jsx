import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../../../backend/config/firebase.js'
import './viewer_reflect.css'; // You can style this as needed

function Viewer_Reflect() {
    const { id } = useParams();
    const [reflection, setReflection] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReflection = async () => {
            if (!id) return;
            try {
                const docRef = doc(db, 'reflection_content', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setReflection(docSnap.data());
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching reflection:', error);
            }
        };

        fetchReflection();
    }, [id]);

    if (!reflection) return <div className="adn-loading">Loading reflection...</div>;

    return (
        <div className="adn-main-reflect-container">
            <div className="adn-reflection-viewer">
                <div className="adn-reflection-header">
                    <h2>{reflection.title}</h2>
                    <p className="adn-meta">
                        <strong>Author:</strong> {reflection.name}<br />
                        <strong>Section & Year:</strong> {reflection.year_section}<br />
                        <strong>Date:</strong> {new Date(reflection.date?.seconds * 1000).toLocaleDateString()}
                    </p>
                </div>
                <div className="adn-reflection-body">
                    <p>{reflection.reflection}</p>
                </div>
                <button className="adn-back-button" onClick={() => navigate(-1)}>← Back</button>
            </div>
        </div>
        
    );
}

export default Viewer_Reflect;
