import PropTypes from 'prop-types';

import './Input.css';

function Input({ inputValue, handleChange }) {
  return (  
    <input 
      className='search-input' 
      type="search" 
      placeholder='Type your search'
      value={inputValue} 
      onChange={handleChange}
    />
  );
}

Input.propTypes = {
  inputValue: PropTypes.string,
  handleChange: PropTypes.func
}

export default Input;