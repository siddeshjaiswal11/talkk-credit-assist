import React from 'react';
import PropTypes from 'prop-types';
import './Buttons.css'

// Primary Button
export const PrimaryButton = ({ onClick, children, className = '', isDisable = false, ...rest }) => {
  return (
    <button
      className={`btn-primary ${className}`}
      onClick={onClick}
      disabled={isDisable}
      type='button'
      {...rest}

    >
      {children}
    </button>
  );
};

PrimaryButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Primary Outline Button
export const PrimaryOutlineButton = ({ onClick, children,isDisable, className = '', ...rest }) => {
  return (
    <button
      className={`btn-primary-outline ${className}`}
      onClick={onClick}
      disabled={isDisable}
      type='button'
      {...rest}
    >
      {children}
    </button>
  );
};

PrimaryOutlineButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
