import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc
} from 'firebase/firestore';

// --- Firebase config ---
const firebaseConfig = {
  apiKey: "AIzaSyD9gycJnG1u4gIi2ADZpW6rvmyZHZk3PYA",
  authDomain: "tudientrung.firebaseapp.com",
  projectId: "tudientrung",
  storageBucket: "tudientrung.firebasestorage.app",
  messagingSenderId: "226406976272",
  appId: "1:226406976272:web:694ba67798203a615ab395"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const [tv, setTV] = useState('');
  const [han, setHan] = useState('');
  const [pinyin, setPinyin] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (err) {
      setError('Sai email hoặc mật khẩu');
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!tv || !han || !pinyin) return alert("Nhập đủ thông tin");
    await addDoc(collection(db, 'tuvung'), {
      tiengViet: tv,
      hanTu: han,
      pinyin: pinyin
    });
    alert("Đã lưu");
    setTV(''); setHan(''); setPinyin('');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Đăng nhập</h2>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full mb-4 p-2 border rounded"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Đăng nhập</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-center">📚 Từ điển tiếng Trung</h1>
      <form onSubmit={handleSave} className="w-full max-w-md space-y-4">
        <input className="w-full p-2 border rounded" placeholder="Tiếng Việt" value={tv} onChange={(e) => setTV(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Hán Tự" value={han} onChange={(e) => setHan(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Pinyin" value={pinyin} onChange={(e) => setPinyin(e.target.value)} />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Lưu từ vựng</button>
      </form>
      <button onClick={handleLogout} className="mt-6 text-sm text-blue-500 underline">Đăng xuất</button>
    </div>
  );
}

export default App;
