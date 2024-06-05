import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuthContext } from './hooks/useAuthContext'
import Login from './components/Login'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <Router>
        <Routes>
          {user ? (
            <Route path="*" element={<Navigate to="/" />} />
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
