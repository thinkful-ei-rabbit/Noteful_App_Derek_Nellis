import React, {useState} from 'react';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';

const FolderForm = ({ clickAddFolder, history }) => {
  const [folderName, setFolderName] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    if (folderName.length !== 0) {
      clickAddFolder(folderName);
      return history.push('/');
    }
  }

  const validateName = () => {
    if(!folderName){
      return 'enter a valid name'
    }
  }

  return (
    <form id="add-folder-form" onSubmit={e => handleSubmit(e)}>
      <label htmlFor="folderName">Folder Name:</label>
      <input type="text" name={"folderName"} onChange={(e) => setFolderName(e.target.value) }/>
      <ValidationError message={validateName()}/>
      <button type="submit">Add folder</button>
    </form>
  );
};

FolderForm.defaultProps = {
  clickAddFolder: () => {},
}

FolderForm.propTypes = {
  clickAddFolder: PropTypes.func.isRequired,
}

export default FolderForm;
