import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, where, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Ensure the Firebase configuration is imported

const ToDoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      if (auth.currentUser) {
        const q = query(
          collection(db, 'tasks'),
          where('userId', '==', auth.currentUser.uid)
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
          setTasks(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        });
        return () => unsubscribe();
      }
    };

    fetchTasks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description } = formData;
    if (title && description) {
      try {
        if (editId) {
          await updateDoc(doc(db, 'tasks', editId), {
            ...formData,
            timestamp: serverTimestamp(),
          });
          setEditId(null);
        } else {
          await addDoc(collection(db, 'tasks'), {
            ...formData,
            userId: auth.currentUser.uid,
            timestamp: serverTimestamp(),
          });
        }
        setFormData({
          title: '',
          description: '',
        });
      } catch (error) {
        console.error('Error saving task:', error);
      }
    }
  };

  const handleEdit = (task) => {
    setFormData({
      title: task.title,
      description: task.description,
    });
    setEditId(task.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
    } catch (error) {
      console.error('Error deleting task:', error);
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
      <h2>To-Do App</h2>
      <button onClick={handleLogout}>Log Out</button>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Task Title"
        />
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Task Description"
        />
        <button type="submit">{editId ? 'Update' : 'Add Task'}</button>
      </form>
      <br />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>: {task.description}
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoApp;
