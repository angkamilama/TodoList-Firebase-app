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

export interface User {
  userEmail: string;
  userId: string;
}
