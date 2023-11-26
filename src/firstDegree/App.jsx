import React from 'react'
import { Route, Routes, } from "react-router-dom";


//Componentes
import Days from './secondDegree/Days'
import Register from './secondDegree/register'

//Provider
import { FoodProvider } from './food';

//CSS
import './css/App.css'




function App() {
  
  
  return (
    <main>
      <FoodProvider>
        <Routes>
          <Route path="/" element={<Days />} />
          <Route path="/foodregister" element={<Register />} />
        </Routes>
      </FoodProvider>
    </main>
  )
}

export default App;