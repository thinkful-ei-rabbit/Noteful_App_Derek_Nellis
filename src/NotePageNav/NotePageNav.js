import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircleButton from '../CircleButton/CircleButton';
import './NotePageNav.css';
import StateContext from '../StateContext';

export default function NotePageNav({ history, match }) {
  return (
    <StateContext.Consumer>
      {({ folders, notes, findNote, findFolder }) => {
        const { noteId } = match.params;
        const note = findNote(notes, noteId) || {};
        const folder = findFolder(folders, note.folderId);
        return (
          <div className="NotePageNav">
            <CircleButton
              tag="button"
              role="link"
              onClick={() => history.goBack()}
              className="NotePageNav__back-button"
            >
              <FontAwesomeIcon icon="chevron-left" />
              <br />
              Back
            </CircleButton>
            {folder && (
              <h3 className="NotePageNav__folder-name">{folder.name}</h3>
            )}
          </div>
        )
      }}
    </StateContext.Consumer>
  )
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
};
