import PropTypes from 'prop-types';

import './Button.css';

function Button({ text, getPosts, disabled }) {
  return (  
    <button 
      className='button' 
      onClick={getPosts}
      disabled={disabled}
    >
      { text }
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  getPosts: PropTypes.func,
  disabled: PropTypes.bool
}

export default Button;