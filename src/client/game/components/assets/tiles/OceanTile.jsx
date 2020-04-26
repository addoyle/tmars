import React from 'react';
import PropTypes from 'prop-types';

const OceanTile = props =>
  props.reserved ? (
    <g>
      <defs>
        <radialGradient
          id="ocean-gradient"
          gradientUnits="userSpaceOnUse"
          cx="216.5"
          cy="250"
          r="212.499"
        >
          <stop
            offset="0"
            style={{ stopColor: 'rgba(142, 211, 245, 0)' }}
          ></stop>
          <stop
            offset="1"
            style={{ stopColor: 'rgba(142, 211, 245, .3)' }}
          ></stop>
        </radialGradient>
      </defs>
    </g>
  ) : (
    <g>
      <defs>
        <radialGradient
          id="drip-gradient"
          gradientUnits="userSpaceOnUse"
          cx="200"
          cy="139"
          r="16"
          gradientTransform="matrix(8.328334, -0.062929, 0.067163, 8.888846, -1462.416382, -964.419189)"
        >
          <stop offset="0" style={{ stopColor: 'rgb(147, 214, 248)' }}></stop>
          <stop offset="1" style={{ stopColor: 'rgb(72, 129, 171)' }}></stop>
        </radialGradient>
        <linearGradient
          id="waves-gradient"
          gradientUnits="userSpaceOnUse"
          x1="216.42"
          y1="238.226"
          x2="216.42"
          y2="456.34"
          gradientTransform="matrix(1, 0, 0, 1, 0.088001, 0)"
        >
          <stop offset="0" style={{ stopColor: 'rgb(2, 59, 95)' }}></stop>
          <stop offset="1" style={{ stopColor: 'rgb(141, 203, 239)' }}></stop>
        </linearGradient>
      </defs>

      <path
        className="waves"
        d="M 38 257.2 C 60.534 268.548 96.345 218.579 137.642 216.598 C 158.896 215.579 176.421 250.897 212.668 252.134 C 245.495 252.628 264.498 211.003 292.634 214.634 C 330.396 219.506 360.751 272.278 395 272.996 L 395 354 L 216.5 457 L 38 354 L 38 257.2 Z"
      ></path>
      <path
        className="drip"
        d="M 216.533 61.976 C 216.533 61.976 110.302 214.682 110.302 281.075 C 110.302 360.748 170.054 397.27 216.533 397.27 C 263.009 397.27 322.763 360.748 322.763 281.075 C 322.763 214.682 216.533 61.976 216.533 61.976 Z"
      />
    </g>
  );

OceanTile.propTypes = {
  reserved: PropTypes.bool
};

export default OceanTile;
