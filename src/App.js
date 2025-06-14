import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Login from './Login';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  if (!user) return <Login onLogin={() => {}} />;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Từ điển tiếng Trung (Đã đăng nhập)</h1>
      {/* Form nhập từ vựng ở đây */}
    </div>
  );
}

export default App;
