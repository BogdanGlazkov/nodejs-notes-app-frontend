import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { NoteModel } from "./models/noteModel";
import Note from "./components/Note/Note";
import * as NotesApi from "./services/notes-api";
import AddNote from "./components/AddNote/AddNote";
import s from "./components/NotesPage/NotesPage.module.css";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNote, setShowAddNote] = useState(false);

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
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
      }
    }
    loadNotes();
  }, []);

  return (
    <Container>
      <Button onClick={() => setShowAddNote(true)} className={s.addBtn}>
        <FaPlus />
        <span>Add new note</span>
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} className={s.note} onDelete={deleteNote} />
          </Col>
        ))}
      </Row>
      {showAddNote && (
        <AddNote
          onDismiss={() => setShowAddNote(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNote(false);
          }}
        />
      )}
    </Container>
  );
}

export default App;
