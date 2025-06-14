// src/App.js
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc
} from 'firebase/firestore';
import Login from './Login'; // ✅ import đúng

// 🔥 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD9gycJnG1u4gIi2ADZpW6rvmyZHZk3PYA",
  authDomain: "tudientrung.firebaseapp.com",
  projectId: "tudientrung",
  storageBucket: "tudientrung.firebasestorage.app",
  messagingSenderId: "226406976272",
  appId: "1:226406976272:web:694ba67798203a615ab395"
};

// ✅ Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function App() {
  const [user, setUser] = useState(null);
  const [tv, setTV] = useState('');
  const [han, setHan] = useState('');
  const [pinyin, setPinyin] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!tv || !han || !pinyin) return alert('Nhập đủ thông tin');
    try {
      await addDoc(collection(db, 'tuvung'), {
        tiengViet: tv,
        hanTu: han,
        pinyin: pinyin
      });
      alert('Đã lưu');
      setTV(''); setHan(''); setPinyin('');
    } catch (err) {
      alert('Lỗi khi lưu từ');
    }
  };

  if (!user) return <Login onLogin={() => {}} />; // ❗ bạn có thể bỏ onLogin nếu không cần

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-center">📚 Từ điển tiếng Trung</h1>
      <form onSubmit={handleSave} className="w-full max-w-md space-y-4">
        <input className="w-full p-2 border rounded" placeholder="Tiếng Việt" value={tv} onChange={(e) => setTV(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Hán Tự" value={han} onChange={(e) => setHan(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Pinyin" value={pinyin} onChange={(e) => setPinyin(e.target.value)} />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Lưu từ vựng</button>
      </form>
      <button onClick={() => signOut(auth)} className="mt-6 text-sm text-blue-500 underline">Đăng xuất</button>
    </div>
  );
}

export default App;
