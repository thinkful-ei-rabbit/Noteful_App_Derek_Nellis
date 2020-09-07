import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Note from '../Note/Note';
import CircleButton from '../CircleButton/CircleButton';
import './NoteListMain.css';
import StateContext from '../StateContext';

export default function NoteListMain({ match }) {
  return (
    <StateContext.Consumer>
      {({ getNotesForFolder, notes, clickNoteDelete }) => {
      const { folderId } = match.params;
      const notesForFolder = getNotesForFolder(notes, folderId);
      return (
        <section className="NoteListMain">
          <ul>
            {notesForFolder.map(note => (
              <li key={note.id}>
                <Note id={note.id} name={note.name} modified={note.modified} clickNoteDelete={clickNoteDelete} />
              </li>
            ))}
          </ul>
          <div className="NoteListMain__button-container">
            <CircleButton
              tag={Link}
              to="/add-note"
              type="button"
              className="NoteListMain__add-note-button"
            >
              <FontAwesomeIcon icon="plus" />
              <br />
              Note
            </CircleButton>
          </div>
        </section>
      )}}
    </StateContext.Consumer>
  );
}

NoteListMain.defaultProps = {
  notes: []
};
