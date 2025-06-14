import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import Login from './Login';

const auth = getAuth();

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const docRef = doc(db, "users", firebaseUser.uid);
        const userDoc = await getDoc(docRef);
        if (userDoc.exists()) {
          setRole(userDoc.data().role || "user");
        } else {
          setRole("user");
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
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 Từ điển tiếng Trung</h1>

      {role === "admin" ? (
        <div className="text-left max-w-2xl">
          <h2 className="text-xl font-semibold mb-2">🔧 Quản trị viên (Admin):</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Xem và quản lý danh sách từ đã nhập</li>
            <li>Thêm từ vựng mới (Tiếng Việt - Hán Tự - Pinyin)</li>
            <li>Sửa hoặc xoá các từ sai</li>
            <li>Phân quyền tài khoản người dùng</li>
            <li>Thống kê hoạt động học tập của người học</li>
          </ul>
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

export default App;
