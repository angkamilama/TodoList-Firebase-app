import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig/Configuration";
import { useState } from "react";
import MyForm from "./MyForm";
import { useNavigate } from "react-router";

interface User {
  userEmail: string;
  userId: string;
}

function Login() {
  const [user, setUser] = useState<User | null>();

  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userEmail = userCredential.user.email as string;
      const userId = userCredential.user.uid;
      setUser({ userEmail, userId });

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <MyForm
        onSubmit={handleLogin}
        buttonText="Login"
        errorMessage="Please fill in your detail!"
      />

      {user && <p>Welcome {user.userEmail}!</p>}
    </div>
  );
}

export default Login;
