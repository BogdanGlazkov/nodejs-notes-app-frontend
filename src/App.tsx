import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import LoginModal from "./components/LoginModal/LoginModal";
import NavBar from "./components/NavBar/NavBar";
import SignUpModal from "./components/SignUpModal/SignUpModal";
import { UserModel } from "./models/userModel";
import * as UsersApi from "./services/users-api";
import NotesPage from "./components/NotesPage/NotesPage";
import HomePage from "./components/HomePage/HomePage";
import s from "./components/NotesPage/NotesPage.module.css";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<UserModel | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await UsersApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLoginClicked={() => setShowLoginModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />

      <Container className={s.notesPage}>
        {loggedInUser ? <NotesPage /> : <HomePage />}
      </Container>

      {showSignUpModal && (
        <SignUpModal
          onDismiss={() => setShowSignUpModal(false)}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false);
          }}
        />
      )}

      {showLoginModal && (
        <LoginModal
          onDismiss={() => setShowLoginModal(false)}
          onLoginSuccessful={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
