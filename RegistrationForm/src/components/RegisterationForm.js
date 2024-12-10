import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, where, onSnapshot, serverTimestamp} from 'firebase/firestore';
import { auth, db } from '../firebase'; // Ensure the Firebase configuration is imported

const RegistrationForm = () => {
  const [registrations, setRegistrations] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    height: '',
    age: '',
    phoneNumber: '',
  });
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const q = query(
          collection(db, 'registrations'),
          where('userId', '==', auth.currentUser.uid)
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
          setRegistrations(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        });
        return () => unsubscribe();
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, surname, height, age, phoneNumber } = formData;
    if (name && surname && height && age && phoneNumber) {
      try {
        if (editId) {
          await updateDoc(doc(db, 'registrations', editId), {
            ...formData,
            timestamp: serverTimestamp(),
          });
          setEditId(null);
        } else {
          await addDoc(collection(db, 'registrations'), {
            ...formData,
            userId: auth.currentUser.uid,
            timestamp: serverTimestamp(),
          });
        }
        setFormData({
          name: '',
          surname: '',
          height: '',
          age: '',
          phoneNumber: '',
        });
      } catch (error) {
        console.error('Error saving registration:', error);
      }
    }
  };

  const handleEdit = (registration) => {
    setFormData({
      name: registration.name,
      surname: registration.surname,
      height: registration.height,
      age: registration.age,
      phoneNumber: registration.phoneNumber,
    });
    setEditId(registration.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'registrations', id));
    } catch (error) {
      console.error('Error deleting registration:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/'); // Redirect to the login page or desired route
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="container">
      <h2>Registration Form</h2>
      <button onClick={handleLogout}>Log Out</button>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          placeholder="Surname"
        />
        <input
          name="height"
          value={formData.height}
          onChange={handleChange}
          placeholder="Height"
        />
        <input
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
        />
        <input
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <button type="save">{editId ? 'Update' : 'Save'}</button>
      </form>
      <br />
      <ul>
        {registrations.map((registration) => (
          <li key={registration.id}>
            {`${registration.name} ${registration.surname} - ${registration.height}cm, ${registration.age} years, Phone: ${registration.phoneNumber}`}
            <button onClick={() => handleEdit(registration)}>Edit</button>
            <button onClick={() => handleDelete(registration.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegistrationForm;
