import React from 'react';
import Note from '../Note/Note';
import './NotePageMain.css';
import StateContext from '../StateContext';



export default function NotePageMain(props) {


  return (

    <StateContext.Consumer>
      {(context) => {
        const { noteId } = props.match.params;
        const note = context.findNote(context.notes, noteId);
        return(
          <section className="NotePageMain">
            <Note
              id={note.id}
              name={note.name}
              modified={note.modified}
              clickNoteDelete={context.clickNoteDelete}
            />
            <div className="NotePageMain__content">
              {note.content.split(/\n \r|\n/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>
        )
      }}
    </StateContext.Consumer>
  );
}

NotePageMain.defaultProps = {
  note: {
    content: ''
  }
};

