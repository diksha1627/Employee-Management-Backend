import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/addfile';
import Payslip from './components/payslip';
const App = () => {
    return (
        <BrowserRouter>
            
            <Routes>
                 <Route exact path="/" element={< Home/>} /> 
                <Route exact path="/payslip/:id" element={< Payslip/>} />
            </Routes>
          
        </BrowserRouter>
    )
}

export default App