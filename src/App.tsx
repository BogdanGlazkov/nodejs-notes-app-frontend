import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { NoteModel } from "./models/noteModel";
import Note from "./components/Note/Note";
import * as NotesApi from "./services/notes-api";
import AddEditNote from "./components/AddEditNote/AddEditNote";
import SignUpModal from "./components/SignUpModal/SignUpModal";
import LoginModal from "./components/LoginModal/LoginModal";
import s from "./components/NotesPage/NotesPage.module.css";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    }
    loadNotes();
  }, []);

  const notesGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${s.notesGrid}`}>
      {notes.map((note) => (
        <Col key={note._id}>
          <Note
            note={note}
            className={s.note}
            onDelete={deleteNote}
            onNoteClicked={setNoteToEdit}
          />
        </Col>
      ))}
    </Row>
  );

  return (
    <Container className={s.notesPage}>
      <Button onClick={() => setShowAddNote(true)} className={s.addBtn}>
        <FaPlus />
        <span>Add new note</span>
      </Button>

      {notesLoading && <Spinner animation="border" variant="primary" />}

      {showNotesLoadingError && (
        <p>Something went wrong. Please refresh the page</p>
      )}

      {!notesLoading && !showNotesLoadingError && (
        <>
          {notes.length > 0 ? notesGrid : <p>You don't have any notes yet</p>}
        </>
      )}

      {showAddNote && (
        <AddEditNote
          onDismiss={() => setShowAddNote(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNote(false);
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNote
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((note) =>
                note._id === updatedNote._id ? updatedNote : note
              )
            );
            setNoteToEdit(null);
          }}
        />
      )}

      {false && (
        <SignUpModal onDismiss={() => {}} onSignUpSuccessful={() => {}} />
      )}

      {false && (
        <LoginModal onDismiss={() => {}} onLoginSuccessful={() => {}} />
      )}
    </Container>
  );
}

export default App;
