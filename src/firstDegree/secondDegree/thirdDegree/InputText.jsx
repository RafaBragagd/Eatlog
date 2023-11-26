import React from 'react'

function InputText({inputRef, nextRef, focus, blur, focusRef, title}) {
//------------------------Funções Gerais--------------------------\\
  const keyDown = (event) => {
    if ((event.key === 'Enter')&&(nextRef != null)){
      event.preventDefault()
      nextRef.current.focus()
    }
  }


  return (
    <div className="input">
      <input
          type="text"
          ref={inputRef}
          onKeyDown={(event) => keyDown(event)}
          onFocus={focus}
          onBlur={(event) => blur(event.target.value)}
      />
      <span className={focusRef ? 'label focus' : 'label'}>{title}</span>
    </div>
  )
}

export default InputText