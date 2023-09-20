import React, { useState } from 'react';
import './App.css'; // Import your CSS file

function App() {
  // ... (your existing code for note management)

  return (
    <div className="App">
      <h1>Simple Note App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter your note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button onClick={addNote}>Add Note</button>
      </div>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            {note}
            <button onClick={() => removeNote(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
