import { Container } from "react-bootstrap";
import NotesList from "../../components/NotesList/NotesList";
import NotesNotAuth from "../../components/NotesNotAuth/NotesNotAuth";
import { UserModel } from "../../models/userModel";
import s from "../../components/NotesList/NotesList.module.css";

interface NotesPageProps {
  loggedInUser: UserModel | null;
}
const NotesPage = ({ loggedInUser }: NotesPageProps) => {
  return (
    <Container className={s.NotesList}>
      {loggedInUser ? <NotesList /> : <NotesNotAuth />}
    </Container>
  );
};

export default NotesPage;
