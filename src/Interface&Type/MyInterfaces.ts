export interface Todotype {
  id: string;
  todoItem?: string;
}

export interface UserInfo {
  email: string;
  password: string;
  loggedIn: boolean;
  userId: string;
}

export interface AuthFormProps {
  onSubmit: (email: string, password: string) => void;
  buttonText: string;
  errorMessage: string;
}
