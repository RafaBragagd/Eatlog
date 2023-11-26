import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

//Componentes
import App from './firstDegree/App.jsx'
import Header from './firstDegree/Header.jsx'

import './reset.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <BrowserRouter>
      {<App />}
  </BrowserRouter>
  </React.StrictMode>,
)
