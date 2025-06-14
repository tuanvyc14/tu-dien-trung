import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

function App() {
  const [tv, setTV] = useState('');
  const [han, setHan] = useState('');
  const [pinyin, setPinyin] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tv || !han || !pinyin) {
      alert("❗ Vui lòng nhập đầy đủ 3 trường!");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "tuvung"), {
        tiengViet: tv,
        hanTu: han,
        pinyin: pinyin,
        createdAt: new Date()
      });
      alert("✅ Đã lưu từ vựng!");
      setTV('');
      setHan('');
      setPinyin('');
    } catch (error) {
      console.error("Lỗi khi lưu:", error);
      alert("❌ Lưu thất bại, kiểm tra lại kết nối Firebase.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">📚 Từ điển tiếng Trung</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-white p-6 rounded shadow">
        <input
          className="w-full p-2 border rounded"
          placeholder="🌐 Tiếng Việt"
          value={tv}
          onChange={(e) => setTV(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="🈷️ Hán Tự"
          value={han}
          onChange={(e) => setHan(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="🔊 Pinyin"
          value={pinyin}
          onChange={(e) => setPinyin(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {loading ? "Đang lưu..." : "💾 Lưu từ vựng"}
        </button>
      </form>
    </div>
  );
}

export default App;
