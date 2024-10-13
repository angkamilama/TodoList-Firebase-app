// AuthForm.tsx
import React, { useState } from "react";

interface AuthFormProps {
  onSubmit: (email: string, password: string) => void;
  buttonText: string;
  errorMessage: string;
}

function AuthForm({ onSubmit, buttonText, errorMessage }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onSubmit(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-[270px] flex flex-col justify-evenly items-center w-11/12 md:full mb-5 border border-orange-500 p-3"
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
        {buttonText}
      </button>
      <p
        className={`${
          showError ? "visible text-red-700 text-center" : "invisible"
        } font-semibold`}
      >
        {errorMessage}
      </p>
    </form>
  );
}

export default AuthForm;
