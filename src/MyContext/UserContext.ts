import { createContext } from "react";

// Define UserInfo type
interface UserInfo {
  email: string;
  password: string;
  loggedIn: boolean;
  userId: string;
}

// Create UserContext
const UserContext = createContext<
  | {
      userInfo: UserInfo;
      setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
    }
  | undefined
>(undefined);

export { UserContext }; // Export UserContext for use in other components
