import React from 'react';

//CSS
import './css/dynamicSelect.css'

function DynamicSelect({className, options, onSelect, inputRef, firstOption }) {
  return (
    <select className={className} ref={inputRef} onChange={onSelect}>
      <option value="">{firstOption}</option>
      {options.map(option => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  )
}

export default DynamicSelect;
