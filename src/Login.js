// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import Login from './Login';

const auth = getAuth();

function Home({ role }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 Từ điển tiếng Trung</h1>

      {role === 'admin' ? (
        <div className="grid grid-cols-1 gap-4 w-full max-w-md">
          <button onClick={() => navigate('/view')} className="p-4 bg-blue-100 hover:bg-blue-200 rounded shadow text-left">
            📄 Xem danh sách từ đã nhập
          </button>
          <button onClick={() => navigate('/add')} className="p-4 bg-green-100 hover:bg-green-200 rounded shadow text-left">
            ➕ Thêm từ vựng mới
          </button>
          <button onClick={() => navigate('/edit')} className="p-4 bg-red-100 hover:bg-red-200 rounded shadow text-left">
            🛠️ Sửa hoặc xoá từ
          </button>
          <button disabled className="p-4 bg-yellow-100 rounded shadow text-left cursor-not-allowed opacity-60">
            👥 Phân quyền tài khoản (sắp có)
          </button>
          <button disabled className="p-4 bg-purple-100 rounded shadow text-left cursor-not-allowed opacity-60">
            📊 Thống kê học tập (sắp có)
          </button>
        </div>
      ) : (
        <div className="text-left max-w-2xl">
          <h2 className="text-xl font-semibold mb-2">🎓 Học viên:</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Ôn tập từ vựng bằng Flashcard</li>
            <li>Làm bài kiểm tra trắc nghiệm</li>
            <li>Xem danh sách từ đã học</li>
            <li>Lịch sử kiểm tra và tiến độ học</li>
          </ul>
        </div>
      )}

      <button onClick={() => signOut(auth)} className="mt-6 text-sm text-blue-500 underline">
        Đăng xuất
      </button>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const docRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(docRef);
        if (userDoc.exists()) {
          setRole(userDoc.data().role || 'user');
        } else {
          setRole('user');
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="p-6 text-center">Đang kiểm tra đăng nhập...</div>;
  if (!user) return <Login />;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home role={role} />} />
        <Route path="/view" element={<div className="p-6">📄 Trang xem từ (đang phát triển)</div>} />
        <Route path="/add" element={<div className="p-6">➕ Trang thêm từ (đang phát triển)</div>} />
        <Route path="/edit" element={<div className="p-6">🛠️ Trang sửa/xoá từ (đang phát triển)</div>} />
      </Routes>
    </Router>
  );
}

export default App;
