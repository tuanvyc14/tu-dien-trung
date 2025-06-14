import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase'; // 🔁 đường dẫn tới firebase config
// Bạn cần truyền hàm onLogin(role) từ App.jsx

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Đọc role từ Firestore (collection: users, document ID: user.uid)
      const docRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(docRef);

      if (userDoc.exists()) {
        const role = userDoc.data().role;
        onLogin(role); // 🔁 Truyền role ra App.jsx để điều hướng
      } else {
        setError('Không tìm thấy quyền của tài khoản trong hệ thống.');
      }
    } catch (err) {
      setError('Sai email hoặc mật khẩu.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Login;
