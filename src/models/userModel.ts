export interface UserModel {
  username: string;
  email: string;
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
