import { useState } from 'react';
import './App.css';
import Books from './components/Books/Books';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  function handleLogin(token) {
    localStorage.setItem('token', token);
    setToken(token);

  }
  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <>

      {token ? (
        <>
          <Books token={token} />
          <Logout onLogout={handleLogout} />
          
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}

    </>
  )
}

export default App
