// src/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      onLogin();
    } catch (err) {
      setError('Sai tài khoản hoặc mật khẩu!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Đăng nhập</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input type="email" className="w-full p-2 border mb-2 rounded" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="w-full p-2 border mb-4 rounded" placeholder="Mật khẩu"
          value={pass} onChange={(e) => setPass(e.target.value)} />
        <button className="w-full bg-blue-500 text-white p-2 rounded">Đăng nhập</button>
      </form>
    </div>
  );
}
