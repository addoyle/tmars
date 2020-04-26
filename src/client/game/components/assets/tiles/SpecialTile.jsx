import React from 'react';
import PropTypes from 'prop-types';

const SpecialTile = props => (
  <g>
    <defs>
      <radialGradient
        id="special-gradient"
        gradientUnits="userSpaceOnUse"
        cx="216.5"
        cy="250"
        r="193.5"
      >
        <stop offset="0" style={{ stopColor: '#CC9256' }}></stop>
        <stop offset="1" style={{ stopColor: '#A26E3A' }}></stop>
      </radialGradient>
    </defs>
    {props.icon ? (
      <image
        href={`/icons/special-${props.icon}.svg`}
        width="384"
        height="384"
        x="25"
        y="59"
      />
    ) : (
      ''
    )}
    {props.children}
  </g>
);

SpecialTile.propTypes = {
  icon: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default SpecialTile;
