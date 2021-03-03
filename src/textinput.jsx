import React from 'react';

const TextInput = (props) => {
  return(
    <input 
      type="file"
      onChange={props.onChange}
    />
  )

}

export default TextInput