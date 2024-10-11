import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig/firebaseConfig";
import { db } from "../firebaseConfig/firebaseConfig";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

interface Todotype {
  id: string;
  todoItem?: string;
}

interface UserInfo {
  email: string;
  password: string;
  loggedIn: boolean;
  userId: string;
}
function Home() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    password: "",
    loggedIn: false,
    userId: "",
  });

  const [todoItem, setTodoItem] = useState("");
  const [editedTodoItem, setEditedTodoItem] = useState("");
  const [editedId, setEditedId] = useState("");
  const [todos, setTodos] = useState<Todotype[]>([]);
  const [registerMessage, setRegisterMessage] = useState(false);
  const [user, setUser] = useState<{
    userEmail: string;
    userId: string;
  } | null>(null);

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
    if (!userInfo.password || !userInfo.email) {
      setRegisterMessage(true);
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password
      );

      const userEmail = userCredential.user.email as string;
      const userId = userCredential.user.uid;
      setUser({ userEmail, userId });
      setUserInfo({ email: "", password: "", loggedIn: true, userId });
    } catch (err) {
      console.error(err);
    }
  };

  const submitTodoItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todoItem) return;

    try {
      await addDoc(collection(db, "TODOLIST"), {
        todoItem,
        userId: userInfo.userId,
      });
      setTodoItem("");
      await fetchTodos(); // Fetch todos after adding the new one
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  const handleDelete = async (userId: string) => {
    const userDoc = doc(db, "TODOLIST", userId);
    await deleteDoc(userDoc);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== userId));
  };

  const handleUpdateTodoItem = async (userId: string) => {
    const userDoc = doc(db, "TODOLIST", userId);
    await updateDoc(userDoc, {
      todoItem: editedTodoItem,
    });
    const updatedTodoList = todos.map((todo) =>
      todo.id === userId ? { ...todo, todoItem: editedTodoItem } : todo
    );
    setTodos(updatedTodoList);
    setEditedId("");
    setEditedTodoItem("");
  };

  return (
    <div className="w-full  h-screen flex justify-center items-center box-border">
      <div className="h-10/12 w-10/12 md:w-5/12">
        <div className="w-full mb-3">
          {userInfo.loggedIn ? (
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
            <>
              <form
                onSubmit={handleSubmit}
                className="h-[270px] flex flex-col justify-evenly items-center w-11/12 md:full mb-5 border border-orange-500 p-3"
              >
                <label className="w-full flex justify-between items-center">
                  E-mail:
                  <input
                    value={userInfo.email}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, email: e.target.value })
                    }
                    className="ml-5 w-[190px] md:w-2/3 p-1 border border-slate-500"
                  />
                </label>
                <label className="w-full flex justify-between items-center">
                  Password:
                  <input
                    type="password"
                    value={userInfo.password}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, password: e.target.value })
                    }
                    className="ml-5 w-[190px] md:w-2/3 border border-slate-500 p-1"
                  />
                </label>
                <button className="border border-slate-700 px-3 py-1 rounded-lg ml-2">
                  Register
                </button>
                <p
                  className={`${registerMessage ? "visible text-red-700 text-center" : "invisible"} font-semibold`}
                >
                  Please fill in your detail!
                </p>
              </form>
              <div>
                <p>
                  Do you already have an account?{" "}
                  <span className="border border-slate-800 p-1 rounded-lg bg-slate-200">
                    Login Here!
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
        <div className=" p-2 ">
          <ul>
            {todos.length > 0 ? (
              <>
                <h1 className="text-lg md:text-center font-bold">Todo List:</h1>
                <div className="flex flex-col justify-evenly items-center">
                  {todos.map((todo) => (
                    <div
                      key={todo.id}
                      className="flex justify-around items-center w-full md:w-2/3 mb-3"
                    >
                      {todo.id === editedId ? (
                        <>
                          <label>
                            <input
                              type="text"
                              value={editedTodoItem}
                              onChange={(e) =>
                                setEditedTodoItem(e.target.value)
                              }
                              className="w-2/3 md:w-2/3 p-1 border border-slate-500"
                            />
                          </label>
                          <button
                            className="w-[70px] border border-slate-700 px-2 py-1 rounded-lg ml-2"
                            onClick={() => handleUpdateTodoItem(todo.id)}
                          >
                            Update
                          </button>
                        </>
                      ) : (
                        <>
                          <li className="w-2/3">{todo?.todoItem}</li>
                          <button
                            onClick={() => setEditedId(todo.id)}
                            className="w-[60px] border border-slate-700 px-3 py-1 rounded-lg ml-2"
                          >
                            Edit
                          </button>
                        </>
                      )}
                      <button
                        className="w-[60px] border border-slate-700 p-1 rounded-lg ml-2"
                        onClick={() => handleDelete(todo.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
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

export default Home;
