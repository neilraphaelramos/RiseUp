import { useEffect, useState } from 'react';
import {
    collection,
    onSnapshot,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from 'firebase/firestore';
import { createUserWithEmailAndPassword, updatePassword } from 'firebase/auth';
import { db, authUser } from '../../../../../backend/config/firebase';
import './acc_manage.css';

function Acc_Manage() {
    const [admins, setAdmins] = useState([]);
    const [newAdmin, setNewAdmin] = useState({ name: '', username: '', email: '', password: '' });
    const [editingId, setEditingId] = useState(null);
    const [editingAdmin, setEditingAdmin] = useState({ name: '', username: '', email: '', password: '' });

    useEffect(() => {
        const q = collection(db, 'users_info');
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const adminUsers = snapshot.docs
                .filter(doc => doc.data().role === 'admin')
                .map(doc => ({ id: doc.id, ...doc.data() }));
            setAdmins(adminUsers);
        });

        return () => unsubscribe();
    }, []);

    const handleAdd = async () => {
        if (!newAdmin.name || !newAdmin.username || !newAdmin.email || !newAdmin.password) return;

        try {
            const userCredential = await createUserWithEmailAndPassword(
                authUser,
                newAdmin.email,
                newAdmin.password
            );

            await addDoc(collection(db, 'users_info'), {
                name: newAdmin.name,
                username: newAdmin.username,
                email: newAdmin.email,
                role: 'admin',
                uid: userCredential.user.uid,
            });

            setNewAdmin({ name: '', username: '', email: '', password: '' });
        } catch (error) {
            console.error('Error creating admin:', error.message);
        }
    };

    const handleEdit = async () => {
        if (!editingId) return;

        try {
            const adminRef = doc(db, 'users_info', editingId);
            await updateDoc(adminRef, {
                name: editingAdmin.name,
                username: editingAdmin.username,
                email: editingAdmin.email,
            });

            // Optionally update password if provided
            if (editingAdmin.password) {
                const user = authUser.currentUser;
                await updatePassword(user, editingAdmin.password);
            }

            setEditingId(null);
            setEditingAdmin({ name: '', username: '', email: '', password: '' });
        } catch (error) {
            console.error('Error updating admin:', error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'users_info', id));
        } catch (error) {
            console.error('Error deleting admin:', error.message);
        }
    };

    return (
        <div className="acc-manage-container">
            <h2>Admin Account Management</h2>

            <div className="admin-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={newAdmin.name}
                    onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={newAdmin.username}
                    onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={newAdmin.password}
                    onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                />
                <button onClick={handleAdd}>Add Admin</button>
            </div>

            {editingId && (
                <div className="admin-form edit-mode">
                    <h4>Edit Admin</h4>
                    <input
                        type="text"
                        placeholder="Name"
                        value={editingAdmin.name}
                        onChange={(e) => setEditingAdmin({ ...editingAdmin, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        value={editingAdmin.username}
                        onChange={(e) => setEditingAdmin({ ...editingAdmin, username: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={editingAdmin.email}
                        onChange={(e) => setEditingAdmin({ ...editingAdmin, email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="New Password (optional)"
                        value={editingAdmin.password}
                        onChange={(e) => setEditingAdmin({ ...editingAdmin, password: e.target.value })}
                    />
                    <button onClick={handleEdit}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                </div>
            )}

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => (
                        <tr key={admin.id}>
                            <td>{admin.name}</td>
                            <td>{admin.username}</td>
                            <td>{admin.email}</td>
                            <td>
                                <button
                                    className='adn-setting-btn'
                                    onClick={() => {
                                        setEditingId(admin.id);
                                        setEditingAdmin({
                                            name: admin.name,
                                            username: admin.username,
                                            email: admin.email,
                                            password: '',
                                        });
                                    }}
                                >
                                    Edit
                                </button>
                                <button className='adn-setting-btn' onClick={() => handleDelete(admin.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Acc_Manage;