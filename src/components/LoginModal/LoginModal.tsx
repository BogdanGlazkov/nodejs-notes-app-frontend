import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginCredentials, UserModel } from "../../models/userModel";
import * as UsersApi from "../../services/users-api";
import { Form, Modal, Button, Alert } from "react-bootstrap";
import TextInputField from "../form/TextInputField";
import { UnauthorizedError } from "../../errors/http_errors";
import s from "./LoginModal.module.css";

interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccessful: (user: UserModel) => void;
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  async function onSubmit(credentials: LoginCredentials) {
    try {
      const user = await UsersApi.login(credentials);
      onLoginSuccessful(user);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {errorText && <Alert variant="danger">{errorText}</Alert>}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: "Field is required" }}
            error={errors.username}
          />

          <TextInputField
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: "Field is required" }}
            error={errors.password}
          />

          <Button type="submit" disabled={isSubmitting} className={s.loginBtn}>
            Log In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
