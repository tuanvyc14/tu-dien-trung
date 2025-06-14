import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Login from './Login'; // <- đường dẫn tới file Login.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  // ...config của bạn
};

initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
  }, []);

  if (!user) return <Login onLogin={() => window.location.reload()} />;

  return (
    <div>
      {/* giao diện thêm từ vựng */}
    </div>
  );
}

export default App;
