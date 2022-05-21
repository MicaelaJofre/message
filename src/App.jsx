import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Home } from './components/Home';
import { Login } from './components/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ResetPassword } from './components/ResetPassword';
import { SingUp } from './components/SingUp';
import { AuthProvider } from "./context/AuthContext";
import './css/main.css'


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path='/' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path='/singup' element={<SingUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/resetPassword' element={<ResetPassword />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export {App};
