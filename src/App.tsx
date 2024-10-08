import { useState, useReducer } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig/firebaseConfig";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<null | string>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
    if (!password || !email) {
      throw new Error("name and email are required");
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userEmail = userCredential.user.email;
      const uid = userCredential.user.uid;
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center box-border">
        <form
          onSubmit={handleSubmit}
          className=" p-3 h-[180px] flex flex-col justify-evenly items-center  md:flex-row  md:justify-between  w-11/12 md:w-1/3  mb-5 border border-red-500"
        >
          <label className="w-full flex justify-between items-center">
            E-mail:
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ml-5 w-[190px] md:w-2/3  p-1 border border-slate-500"
            />
          </label>
          <label className="w-full flex justify-between items-center">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ml-5 w-[190px] md:w-2/3 border border-slate-500 p-1"
            />
          </label>
          <button className="border border-slate-700 px-3 py-1 rounded-lg ml-2">
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
