import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CONSTANTS from '../../constants.js';

const Logo = ({ to, target, ...props }) => (
  <Link to={to} target={target}>
    <img src={props.src} alt={props.alt} />
  </Link>
);

Logo.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
};

Logo.defaultProps = {
  to: '/',
  target: '_self',
  src: `${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`,
  alt: 'logo',
};

export default Logo;
