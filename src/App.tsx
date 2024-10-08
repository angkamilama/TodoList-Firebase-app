import { useState, useReducer } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig/firebaseConfig";
import { db } from "./firebaseConfig/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [todoItem, setTodoItem] = useState("");
  const [user, setUser] = useState<{ userEmail: string; uid: string } | null>(
    null
  );

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
      console.log(auth.currentUser);
      console.log(userCredential.user);

      const userEmail = userCredential.user.email as string;
      const uid = userCredential.user.uid;
      setUser({ userEmail, uid }); // it is an object
      setEmail("");
      setPassword("");
      setLoggedIn(true);
    } catch (err) {
      console.error(err);
    }
  };

  const submitTodoItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todoItem) return;
    try {
      await addDoc(collection(db, "TodoList"), {
        todoItem: todoItem,
      });
      setTodoItem("");
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center box-border">
        {loggedIn ? (
          <div>
            {user && <p className="mb-3">Welcome {user.userEmail}!</p>}
            <form
              onSubmit={submitTodoItem}
              className="flex  justify-evenly items-center"
            >
              <label>
                Todo:
                <input
                  type="text"
                  value={todoItem}
                  onChange={(e) => setTodoItem(e.target.value)}
                  className="ml-5 w-[190px] md:w-2/3  p-1 border border-slate-500"
                />
              </label>
              <button className="border border-slate-700 px-3 py-1 rounded-lg ml-2">
                Add
              </button>
            </form>
          </div>
        ) : (
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
        )}
      </div>
    </>
  );
}

export default App;
