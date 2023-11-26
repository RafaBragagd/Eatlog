import React from 'react'

import Logo from './img/Logo.svg'

import './css/Header.css'

export default function Header() {
  return (
    <header>
        <span>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%" className='background'>
            <polygon points="0,0 100,0 100,100 60,85 0,100" />
          </svg>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%" className='backgroundtwo'>
            <polygon points="0,0 65,0 65,52 0,100" />
          </svg>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%" className='backgroundthree'>
            <polygon points="45,0 100,0 100,100 45,60" />
          </svg>
        </span>

        <img src={Logo} alt="Logo" id='logo'/>
        <h1>EatLog</h1>
      </header>
  )
}
