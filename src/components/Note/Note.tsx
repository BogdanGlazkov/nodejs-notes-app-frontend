import { Card } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { NoteModel } from "../../models/noteModel";
import { formatDate } from "../../utils/formatDate";
import s from "./Note.module.css";

interface NoteProps {
  note: NoteModel;
  onDelete: (note: NoteModel) => void;
  className?: string;
}

const Note = ({ note, className, onDelete }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt);
  }

  return (
    <Card className={`${s.noteCard} ${className}`}>
      <Card.Body className={s.cardBody}>
        <Card.Title className={s.cardTitle}>
          {title}
          <MdDelete
            className="text-muted ms-auto"
            onClick={(e) => {
              onDelete(note);
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text className={s.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

export default Note;
