import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Home } from './components/Home';
import { Login } from './components/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ResetPassword } from './components/ResetPassword';
import { Rooms } from './components/Rooms';
import { SingUp } from './components/SingUp';
import { UpdateRoom } from './components/UpdateRoom';
import { ViewRoom } from './components/ViewRoom';
import { AuthProvider } from "./context/AuthContext";
import './css/main.css'


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Home/>
              </ProtectedRoute>
            } />
          <Route path='/singup' element={<SingUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/resetPassword' element={<ResetPassword />} />
          <Route path='/rooms' element={<Rooms />} />
          <Route path='/updateRoom' element={<UpdateRoom />} />
          <Route path='/viewRoom' element={<ViewRoom/>} />
        </Routes>
      </AuthProvider>

    </div>
  );
}

export { App };
