import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import { getNotesForFolder, findNote, findFolder } from '../notes-helpers';
import './App.css';
import StateContext from '../StateContext';
import cuid from 'cuid';
import FolderForm from '../AddFolder/FolderForm';
import NoteForm from '../AddNote/NoteForm';
import ErrorBoundary from '../ErrorBoundary';

const BASE_URL = 'http://localhost:9090/';

// "folders": [
//   {
//     "id": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
//     "name": "Important"
//   },
// "notes": [
//   {
//     "id": "cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1",
//     "name": "Dogs",
//     "modified": "2019-01-03T00:00:00.000Z",
//     "folderId": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
//     "content": "Corporis accusamus
//   },

class App extends Component {
  state = {
    notes: [],
    folders: [],
    error: null
  };

  static contextType = StateContext

  componentDidMount() {
    return ['notes', 'folders'].map(point => (
      fetch(BASE_URL + point, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(res.status)
          }
          return res.json()
        })
        .then(data => {
          this.setState({
            [point]: data
          })
        })
        .catch(error => this.setState({ error }))
    ))
  }

  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={NoteListNav}
          />
        ))}
        <Route
          path="/note/:noteId"
          component={NotePageNav}
        />
        <Route path="/add-folder" render={(routerProps) => (
          <FolderForm
            clickAddFolder={this.handleAddFolder}
            {...routerProps}
          />
        )}/>
        <Route path="/add-note" render={(routerProps) => (
          <NoteForm
            clickAddNote={this.handleAddNote}
            folders={this.state.folders}
            {...routerProps}
          />
        )}/>
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={NoteListMain}
          />
        ))}
        <Route
          path="/note/:noteId"
          component={NotePageMain}
        />
      </>
    );
  }

  handleDeleteNote = (noteId) => {
    fetch(`${BASE_URL}notes/${noteId}`, {method:'DELETE'})
    .then(() => {
      const notes = this.state.notes.filter(note => note.id !== noteId);
      this.setState({
        notes
      })
    })
  }

  handleAddNote = (name, content, folderId) => {
    let newNote = {
      id: cuid(),
      name: name,
      content: content,
      folderId: folderId,
      modified: new Date()
    }

    fetch(`${BASE_URL}notes`, {
      method:'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newNote)
    })
    .then(() =>{
      this.setState({
        notes: [...this.state.notes, newNote]
      })
    })
  }

  handleAddFolder = (folderName) => {
    let newFolder = {
      id: cuid(),
      name: folderName
    }

    fetch(`${BASE_URL}folders/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newFolder)
    })
    .then(() => {
      this.setState({
        folders: [...this.state.folders, newFolder]
      })
    })
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      getNotesForFolder,
      findNote,
      findFolder,
      clickNoteDelete: this.handleDeleteNote,
      clickAddFolder: this.handleAddFolder
    }

    return (
        <StateContext.Provider value={contextValue}>
            <ErrorBoundary>
              <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                  <h1>
                    <Link to="/">Noteful</Link> <FontAwesomeIcon icon="check-double" />
                  </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
              </div>
            </ErrorBoundary>
        </StateContext.Provider>
    );
  }
}

export default App;
