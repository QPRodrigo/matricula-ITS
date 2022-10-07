import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Inicio from './components/Inicio'
import Cliente from './components/Cliente'
import Login from './components/Login'
import Menu from './components/Menu'
import Cuotas from './components/Cuotas'

const App = () => {
    return(
        <div className = 'container'>
            <Router> 
                <Menu></Menu>
                <Routes>
                    <Route exact path='/' element={<Inicio/>}></Route>
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='/cliente' element={<Cliente/>}></Route>
                    <Route path='/cuotas' element={<Cuotas/>}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;