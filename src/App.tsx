import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig/firebaseConfig";
import { db } from "./firebaseConfig/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

interface Todotype {
  id: string;
  todoItem?: string;
}

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [todoItem, setTodoItem] = useState("");
  const [todos, setTodos] = useState<Todotype[]>([]);
  const [user, setUser] = useState<{ userEmail: string; uid: string } | null>(
    null
  );

  const fetchTodos = async () => {
    try {
      const usersCollectionRef = await getDocs(collection(db, "TODOLIST"));
      console.log(usersCollectionRef.docs);

      const users = usersCollectionRef.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(), // Spread the document data
        };
      });

      console.log(users);

      setTodos(users); // Update state with the fetched todos
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password || !email) {
      alert("Email and password are required");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userEmail = userCredential.user.email as string;
      const uid = userCredential.user.uid;
      setUser({ userEmail, uid });
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
      await addDoc(collection(db, "TODOLIST"), { todoItem });
      setTodoItem("");
      await fetchTodos(); // Fetch todos after adding the new one
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  return (
    <div className="w-full  h-screen flex justify-center items-center box-border">
      <div className="h-10/12 w-10/12 md:w-7/12 border border-orange-500 p-2">
        <div className="w-full mb-3">
          {loggedIn ? (
            <div className="text-center">
              {user && <p className="mb-5">Welcome {user.userEmail}!</p>}
              <form
                onSubmit={submitTodoItem}
                className="flex justify-evenly items-center"
              >
                <label>
                  Todo:
                  <input
                    type="text"
                    value={todoItem}
                    onChange={(e) => setTodoItem(e.target.value)}
                    className="ml-5 w-[190px] md:w-2/3 p-1 border border-slate-500"
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
              className="p-3 h-[180px] flex flex-col justify-evenly items-center md:flex-row md:justify-between w-11/12 md:w-1/3 mb-5 "
            >
              <label className="w-full flex justify-between items-center">
                E-mail:
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="ml-5 w-[190px] md:w-2/3 p-1 border border-slate-500"
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
        <div className=" p-2 ">
          <ul>
            {todos.length > 0 ? (
              <>
                <h1 className="text-lg font-bold">Todo List:</h1>
                <p className="flex flex-col justify-evenly items-center">
                  {todos.map((todo) => (
                    <div
                      key={todo.id}
                      className="flex justify-around  items-center w-11/12 mb-3"
                    >
                      <li className="w-2/3  ">{todo?.todoItem}</li>
                      <button className="w-[60px] border border-slate-700 px-3 py-1 rounded-lg ml-2">
                        Edit
                      </button>
                      <button className="w-[70px] border border-slate-700 px-3 py-1 rounded-lg ml-2">
                        Delete
                      </button>
                    </div>
                  ))}
                </p>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
