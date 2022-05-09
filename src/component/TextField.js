import React from "react";

const TextField = (props) => {
  const { label, name, type, value, handleChange, placeholder, errorValidation } = props

  return (
    <div className="field_row_inner">
      {label ? <label >{label}* </label> : ""}
      <div className="field_input relative">
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={(e) => handleChange(e)}
        
        />
      </div>
      {errorValidation ? <span className="error" style={{ color: 'red' }} >{errorValidation}</span> : ""}
    
    </div>
  )

}

export default TextField;