"use client";

import { useState } from "react";
import { login } from "../actions/login";

export default function Login() {
  const [password, setPassword] = useState('');

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const success = await login(password);
        if (!success) {
          setPassword('');
        }
      }}
    >
      <input
        value={password}
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></input>
      <button type="submit">Login</button>
    </form>
  );
}
