import { useState, useEffect } from "react";
import "./App.css";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase.ts";

function App() {
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [entries, setEntries] = useState([]);

  // Read entries from Firestore
  useEffect(() => {
    const q = query(collection(db, "journal"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEntries(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Create new entry
  const handleAddEntry = async () => {
    if (!date || !desc) {
      alert("Please enter a date and a description.");
      return;
    }

    try {
      await addDoc(collection(db, "journal"), {
        date,
        desc,
        createdAt: serverTimestamp()
      });

      setDate("");
      setDesc("");
    } catch (err) {
      console.error("Error adding entry:", err);
    }
  };

  // Delete entry
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "journal", id));
    } catch (err) {
      console.error("Error deleting entry:", err);
    }
  };

  return (
    <div className="App">
      <h1>Journal Entries</h1>

      <div className="entry-form">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <textarea
          placeholder="Write your thoughts..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleAddEntry}>Add Entry</button>
      </div>

      <div className="entries-list">
        {entries.map((entry) => (
          <div key={entry.id} className="entry-card">
            <h3>{entry.date}</h3>
            <p>{entry.desc}</p>
            <button onClick={() => handleDelete(entry.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
