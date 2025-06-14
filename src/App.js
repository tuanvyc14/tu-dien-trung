import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD9gycJnG1u4gIi2ADZpW6rvmyZHZk3PYA",
  authDomain: "tudientrung.firebaseapp.com",
  projectId: "tudientrung",
  storageBucket: "tudientrung.firebasestorage.app",
  messagingSenderId: "226406976272",
  appId: "1:226406976272:web:694ba67798203a615ab395"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [tv, setTV] = useState('');
  const [han, setHan] = useState('');
  const [pinyin, setPinyin] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (err) {
      alert('Đăng nhập thất bại');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "tuvung"), {
        tiengViet: tv,
        hanTu: han,
        pinyin: pinyin,
        createdBy: user.email
      });
      alert("Đã lưu từ vựng");
      setTV('');
      setHan('');
      setPinyin('');
    } catch (err) {
      alert("Lỗi khi lưu");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-xl font-bold mb-4">Đăng nhập</h1>
        <form onSubmit={handleLogin} className="space-y-4 max-w-md">
          <input className="w-full p-2 border rounded" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full p-2 border rounded" placeholder="Mật khẩu" type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
          <button className="px-4 py-2 bg-blue-500 text-white rounded" type="submit">Đăng nhập</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">📚 Từ điển tiếng Trung</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input className="w-full p-2 border rounded" placeholder="Tiếng Việt" value={tv} onChange={(e) => setTV(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Hán Tự" value={han} onChange={(e) => setHan(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Pinyin" value={pinyin} onChange={(e) => setPinyin(e.target.value)} />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">📄 Lưu từ vựng</button>
      </form>
    </div>
  );
}

export default App;
