import React from 'react'

//Imagens
import UpImage from './img/Up.svg'

//CSS
import './css/InputNumber.css'


const ignoreKeys = ['Backspace','ArrowUp','ArrowDown','ArrowLeft','ArrowRight']
function InputNumber({className, inputRef, nextRef, focus, blur, focusRef, min, unit, title}) {


//------------------------Funções Gerais--------------------------\\
  const keyDown = (event) => {
    
  }
  const numberKeyDown = (event) => {
    if ((event.key === 'Enter')&&(nextRef != null)){
      event.preventDefault()
      nextRef.current.focus()
      return
    }
    if (ignoreKeys.includes(event.key)) {
      return
    }
    if((event.key === ".") && !(inputRef.current.value.includes('.'))){
      return
    }
    if (!/\d/.test(event.key)) {
      event.preventDefault();
    }
  }

//Funções de incremento e decremento dos input numbers
  const upNumber = (focus) => {
    if (inputRef.current.value === ""){
        inputRef.current.value = 1
    } else {
        const newValue = parseFloat(inputRef.current.value) + 1
        inputRef.current.value = newValue
    }

    // Disparar manualmente o evento
    focus()
  }
  const downNumber = (focus) => {
    let newValue = parseFloat(inputRef.current.value) - 1

    if ((isNaN(newValue))||(newValue < 0)){
      newValue = 0
    }

    inputRef.current.value = newValue

    // Disparar manualmente o evento
    focus()
  }


  return (
    <div className={"input inputNumber " + className}>
      <input
          type="text"
          ref={inputRef}
          onKeyDown={numberKeyDown}
          onFocus={focus}
          onBlur={(event) => blur(event.target.value)}
      />
      <span className={focusRef ? 'label focus' : 'label'}>{title}</span>
      <span className="unit">{unit}</span>
      <div className="numberButton">
          <button type='button' id='up' onClick={() => upNumber(focus)}>
              <img src={UpImage} alt="" />
          </button>
          <button type='button' id='down' onClick={() => downNumber(focus)}>
              <img src={UpImage} alt="" />
          </button>
      </div>
    </div>
  )
}

export default InputNumber