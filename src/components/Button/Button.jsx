/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React from 'react';
// import PropTypes from 'prop-types';
// dumb component to write simple test

function Button({ onClick, buttonText, type }) {
  return <button type={type} onClick={onClick}>{buttonText}</button>;
}

// Button.PropTypes = {
//   onClick: PropTypes.func.isRequired,
//   buttonText: PropTypes.string.isRequired,

// };

export default Button;
