import React from 'react';
import './Assets.scss';
// <div className={`icon tile ${props.name}`} />

const tiles = {
  ocean: props => (
    <g>
      <defs>
        <radialGradient id="drip-gradient" gradientUnits="userSpaceOnUse" cx="200" cy="139" r="16" gradientTransform="matrix(8.328334, -0.062929, 0.067163, 8.888846, -1462.416382, -964.419189)">
          <stop offset="0" style={{stopColor: 'rgb(147, 214, 248)'}}></stop>
          <stop offset="1" style={{stopColor: 'rgb(72, 129, 171)'}}></stop>
        </radialGradient>
        <linearGradient id="waves-gradient" gradientUnits="userSpaceOnUse" x1="216.42" y1="238.226" x2="216.42" y2="456.34" gradientTransform="matrix(1, 0, 0, 1, 0.088001, 0)">
          <stop offset="0" style={{stopColor: 'rgb(2, 59, 95)'}}></stop>
          <stop offset="1" style={{stopColor: 'rgb(141, 203, 239)'}}></stop>
        </linearGradient>
      </defs>

      <path className="waves" d="M 38 257.2 C 60.534 268.548 96.345 218.579 137.642 216.598 C 158.896 215.579 176.421 250.897 212.668 252.134 C 245.495 252.628 264.498 211.003 292.634 214.634 C 330.396 219.506 360.751 272.278 395 272.996 L 395 354 L 216.5 457 L 38 354 L 38 257.2 Z"></path>
      <path className="drip" d="M 216.533 61.976 C 216.533 61.976 110.302 214.682 110.302 281.075 C 110.302 360.748 170.054 397.27 216.533 397.27 C 263.009 397.27 322.763 360.748 322.763 281.075 C 322.763 214.682 216.533 61.976 216.533 61.976 Z" />
    </g>
  ),
  city: props => (
    <g>
      <defs>
        <radialGradient id="city-gradient" gradientUnits="userSpaceOnUse" cx="216.5" cy="250" r="193.5">
          <stop offset="0" style={{stopColor: '#ddd'}}></stop>
          <stop offset="1" style={{stopColor: '#999'}}></stop>
        </radialGradient>
      </defs>
      <image href="/icons/city.svg" width="300" height="300" x="64" y="100" />
    </g>
  ),
  greenery: props => (
    <g />
  ),
  special: props => (
    <g>
      <defs>
        <radialGradient id="special-gradient" gradientUnits="userSpaceOnUse" cx="216.5" cy="250" r="193.5">
          <stop offset="0" style={{stopColor: '#CC9256'}}></stop>
          <stop offset="1" style={{stopColor: '#A26E3A'}}></stop>
        </radialGradient>
      </defs>
      {props.children}
    </g>
  )
};

export default function Tile(props) {
  var key = props.name;
  if (props.name === 'city capital') {
    key = 'city';
  }

  return (
    <svg viewBox="12 -12 443.012 524" className={`tile ${props.name} ${props.anyone ? 'anyone' : ''}`} data-icon={props.icon}>
      <path className="base" d="M 216.5 4 L 428.999 127 L 428.999 373 L 216.5 496 L 4.001 373 L 4.001 127 Z"></path>
      <path className="outline-color" d="M 216.5 26 L 410 138 L 410 362 L 216.5 474 L 23 362 L 23 138 Z" />

      {tiles[key](props)}
      {props.asterisk ? (<text x="360" y="240" className="asterisk">*</text>) : ''}
    </svg>
  );
}
