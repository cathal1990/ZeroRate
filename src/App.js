import React from "react";
import './less/index.css'
import { LoginPage, DashboardPage } from './components'
import { Routes, Route } from 'react-router-dom'


function App() {

  return (
    <>
      <div className="App">
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path={'/dashboard'} element={<DashboardPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
