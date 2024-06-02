import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import Public from '../pages/Public';

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/playview' element={<Public />}/>
    </Routes>
  )
}

export default Router