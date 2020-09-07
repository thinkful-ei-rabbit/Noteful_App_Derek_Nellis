import React, { useState } from 'react';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';

const NoteForm = ({ clickAddNote, folders, history }) => {
  const [name, setName] = useState();
  const [content, setContent] = useState();
  const [folderId, setFolderId] = useState(folders[0].id);

  const folderOptions = folders.map((folder, idx) => (
    <option key={idx} value={folder.id}>{folder.name}</option>
  ))

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitting');
    clickAddNote(name, content, folderId);
    return history.push(`folder/${folderId}`)
  }

  const validateName = () => {
    if (!name) return 'You need a name!'
  }

  const validateDesc = () => {
    if (!content) return 'You need a description!!'
  }

  const renderSubmit = () => {
    let bool = true
    if (name && content) {
      bool = false;
    }
    return (
      <button type='submit' disabled={bool}>Submit!</button>
    )
  }


  return (
    <form id="add-note-form" onSubmit={e => handleSubmit(e)}>
      <label htmlFor="noteName">Note Name: </label>
      <input type="text" name="noteName" onChange={e => setName(e.target.value)}/>
      <ValidationError message={validateName()}/>

      <label htmlFor="noteDesc">Description: </label>
      <input type="text" name='noteDesc' onChange={e => setContent(e.target.value)}/>
      <ValidationError message={validateDesc()}/>

      <label htmlFor="folderName">Folder: </label>
      <select type="text" name="folderName" onChange={e => setFolderId(e.target.value)}>
        {folderOptions}
      </select>
      {renderSubmit()}
    </form>
  )
}

NoteForm.defaultProps = {
  clickAddNote: () => {},
  folders: []
}

NoteForm.propTypes = {
  clickAddNote: PropTypes.func.isRequired,
  folders: PropTypes.array.isRequired
}

export default NoteForm
