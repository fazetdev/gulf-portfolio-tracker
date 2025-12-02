import React from 'react';
import './Notes.css';

function NoteItem({ note, onDelete }) {
  return (
    <div className="note-item">
      <div className="note-content">
        <p>{note.content}</p>
        <div className="note-meta">
          <span className="note-date">
            {new Date(note.timestamp).toLocaleDateString()}
          </span>
          <span className="note-project">{note.project}</span>
        </div>
      </div>
      {onDelete && (
        <button className="delete-btn" onClick={() => onDelete(note.id)}>
          ×
        </button>
      )}
    </div>
  );
}

export default NoteItem;
