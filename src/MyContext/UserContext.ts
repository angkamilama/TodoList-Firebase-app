import { createContext } from "react";

interface UserInfo {
  email: string;
  password: string;
  loggedIn: boolean;
  userId: string;
}

const UserContext = createContext<
  | {
      userInfo: UserInfo;
      setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
    }
  | undefined
>(undefined);

export { UserContext };
