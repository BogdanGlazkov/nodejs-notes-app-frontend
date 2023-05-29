import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NoteModel } from "./models/note";
import Note from "./components/Note/Note";
import s from "./components/NotesPage/NotesPage.module.css";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch("/api/notes", {
          method: "GET",
        });
        const notes = await response.json();
        setNotes(notes);
      } catch (error) {
        console.error(error);
      }
    }
    loadNotes();
  }, []);

  return (
    <Container>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} className={s.note} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
