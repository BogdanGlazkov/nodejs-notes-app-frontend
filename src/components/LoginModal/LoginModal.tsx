import { useForm } from "react-hook-form";
import { LoginCredentials, UserModel } from "../../models/userModel";
import * as UsersApi from "../../services/users-api";
import { Form, Modal, Button } from "react-bootstrap";
import TextInputField from "../form/TextInputField";
import s from "./LoginModal.module.css";

interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccessful: (user: UserModel) => void;
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
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
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>

      <Modal.Body>
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
