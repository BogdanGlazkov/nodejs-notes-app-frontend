import {
  UserModel,
  SignUpCredentials,
  LoginCredentials,
} from "../models/userModel";
import { fetchData } from "./notes-api";

export async function getLoggedInUser(): Promise<UserModel> {
  const response = await fetchData("/api/users", { method: "GET" });
  return response.json();
}

export async function signUp(
  credentials: SignUpCredentials
): Promise<UserModel> {
  const response = await fetchData("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function login(credentials: LoginCredentials): Promise<UserModel> {
  const response = await fetchData("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function logout() {
  await fetchData("/api/users/logout", { method: "POST" });
}
