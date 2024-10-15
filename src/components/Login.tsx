import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig/Configuration";
import MyForm from "./MyForm";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../MyContext/UserContext";

function Login() {
  const navigate = useNavigate();
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("Login must be used within a UserProvider");
  }

  const { userInfo, setUserInfo } = context;
  console.log(userInfo);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userEmail = userCredential.user.email as string;
      const userId = userCredential.user.uid;

      const newUserInfo = {
        email: userEmail,
        password: "",
        loggedIn: true,
        userId: userId,
      };

      setUserInfo(newUserInfo);
      navigate("/");
    } catch (err) {
      // Update error message for the user
      setErrorMessage("Login failed. Please check your email and password.");
      console.error(err);
    }
  };

  return (
    <div>
      {errorMessage && <p className="text-red-700">{errorMessage}</p>}
      <MyForm
        onSubmit={handleLogin}
        buttonText="Login"
        errorMessage="Please fill in your details!"
      />
    </div>
  );
}

export default Login;
