import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { SignUpCredentials, UserModel } from "../../models/userModel";
import * as UsersApi from "../../services/users-api";
import TextInputField from "../form/TextInputField";
import { ConflictError } from "../../errors/http_errors";
import s from "./SignUpModal.module.css";

interface SignUpModalProps {
  onDismiss: () => void;
  onSignUpSuccessful: (user: UserModel) => void;
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  async function onSubmit(credentials: SignUpCredentials) {
    try {
      const newUser = await UsersApi.signUp(credentials);
      onSignUpSuccessful(newUser);
    } catch (error) {
      if (error instanceof ConflictError) {
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
        <Modal.Title>Sign Up</Modal.Title>
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
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            register={register}
            registerOptions={{ required: "Field is required" }}
            error={errors.email}
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

          <Button type="submit" disabled={isSubmitting} className={s.signUpBtn}>
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
