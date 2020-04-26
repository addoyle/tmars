import React from 'react';
import PropTypes from 'prop-types';

const CityTile = props => (
  <g>
    <defs>
      <radialGradient
        id="city-gradient"
        gradientUnits="userSpaceOnUse"
        cx="216.5"
        cy="250"
        r="193.5"
      >
        <stop offset="0" style={{ stopColor: '#ddd' }}></stop>
        <stop offset="1" style={{ stopColor: '#999' }}></stop>
      </radialGradient>
      <linearGradient
        id="city-border"
        gradientUnits="userSpaceOnUse"
        x1="216.42"
        y1="238.226"
        x2="216.42"
        y2="456.34"
      >
        <stop offset="0" style={{ stopColor: '#ccc' }}></stop>
        <stop offset="1" style={{ stopColor: '#333' }}></stop>
      </linearGradient>
    </defs>
    {props.noIcon ? null : (
      <image href="/icons/city.svg" width="300" height="300" x="64" y="100" />
    )}
  </g>
);

CityTile.propTypes = {
  noIcon: PropTypes.bool
};

export default CityTile;
