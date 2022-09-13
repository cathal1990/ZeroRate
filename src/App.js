import React from "react";
import './less/index.css'
import { LoginPage, DashboardPage, CoinAnalysis } from './components'
import { Routes, Route } from 'react-router-dom'


function App() {

  return (
    <>
      <div className="App">
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path={'/dashboard'} element={<DashboardPage />} />
          <Route path={'/dashboard/coin-analysis'} element={<CoinAnalysis />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
