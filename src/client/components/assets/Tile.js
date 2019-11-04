import React from 'react';
import './Assets.scss';

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
        <linearGradient id="city-border" gradientUnits="userSpaceOnUse" x1="216.42" y1="238.226" x2="216.42" y2="456.34">
          <stop offset="0" style={{stopColor: '#ccc'}}></stop>
          <stop offset="1" style={{stopColor: '#333'}}></stop>
        </linearGradient>
      </defs>
      <image href="/icons/city.svg" width="300" height="300" x="64" y="100" />
    </g>
  ),
  'blank-city': props => (
    <g>
      <defs>
        <radialGradient id="city-gradient" gradientUnits="userSpaceOnUse" cx="216.5" cy="250" r="193.5">
          <stop offset="0" style={{stopColor: '#ddd'}}></stop>
          <stop offset="1" style={{stopColor: '#999'}}></stop>
        </radialGradient>
        <linearGradient id="city-border" gradientUnits="userSpaceOnUse" x1="216.42" y1="238.226" x2="216.42" y2="456.34">
          <stop offset="0" style={{stopColor: '#ccc'}}></stop>
          <stop offset="1" style={{stopColor: '#333'}}></stop>
        </linearGradient>
      </defs>
    </g>
  ),
  greenery: props => (
    <g>
      <defs>
        <radialGradient id="tree-gradient" gradientUnits="userSpaceOnUse" cx="120.889" cy="104.265" r="110.5" gradientTransform="matrix(0, 1.546839, -1, 0, 225.153999, -82.730797)">
          <stop offset="0" style={{stopColor: 'hsl(135, 55%, 19%)'}}></stop>
          <stop offset="1" style={{stopColor: 'hsl(135, 55%, 27%)'}}></stop>
        </radialGradient>
        <radialGradient id="greenery-gradient" gradientUnits="userSpaceOnUse" cx="216.5" cy="250" r="193.5">
          <stop offset="0" style={{stopColor: 'hsl(95, 65%, 50%)'}}></stop>
          <stop offset="1" style={{stopColor: 'hsl(95, 65%, 40%)'}}></stop>
        </radialGradient>
        <linearGradient id="greenery-border" gradientUnits="userSpaceOnUse" x1="216.42" y1="238.226" x2="216.42" y2="456.34">
          <stop offset="0" style={{stopColor: '#59B22C'}}></stop>
          <stop offset="1" style={{stopColor: '#295214'}}></stop>
        </linearGradient>
      </defs>
      <path transform="matrix(.9,0,0,.9,110,110)" className="tree" d="M 106.112 296 C 115.457 250.824 119.006 148.444 90.908 153.748 C 84.068 162.733 27.831 186.879 5.78 143.566 C -2.281 127.73 6.799 102.669 38.167 98.879 C 30.993 23.433 92.486 28.075 98.894 44.559 C 105.054 -36.118 220.307 10.213 203.207 101.926 C 238.623 113.201 234.695 188.044 144.835 163.26 C 135.179 194.181 147.111 278.917 159.137 293.82 L 106.112 296 Z"></path>
      <g className="oxygen">
        <text x="290" y="160">+</text>
        <image href="/icons/oxygen.svg" width="140" height="140" x="355" y="60" />
      </g>
    </g>
  ),
  special: props => (
    <g>
      <defs>
        <radialGradient id="special-gradient" gradientUnits="userSpaceOnUse" cx="216.5" cy="250" r="193.5">
          <stop offset="0" style={{stopColor: '#CC9256'}}></stop>
          <stop offset="1" style={{stopColor: '#A26E3A'}}></stop>
        </radialGradient>
      </defs>
      {props.icon ? (<image href={`/icons/special-${props.icon}.svg`} width="384" height="384" x="25" y="59" />) : ''}
      {props.children}
    </g>
  ),
  'reserved-ocean': props => (
    <g>
      <defs>
        <radialGradient id="ocean-gradient" gradientUnits="userSpaceOnUse" cx="216.5" cy="250" r="212.499">
          <stop offset="0" style={{stopColor: 'rgba(142, 211, 245, 0)'}}></stop>
          <stop offset="1" style={{stopColor: 'rgba(142, 211, 245, .3)'}}></stop>
        </radialGradient>
      </defs>
    </g>
  ),
  blank: props => (<g />)
};

/**
 * Tile
 *
 * @prop name      Tile type (e.g. City, greenery, etc.)
 * @prop anyone    Boolean, true affects anyone (red border), otherwise false
 * @prop clickable Tile becomes clickable with specified type (city, greenery, etc.)
 * @prop icon      Icon to show on the tile (e.g. city, greenery, etc.)
 * @prop asterisk  Boolean, true to show an asterisk, otherwise false
 */
export default function Tile(props) {
  var key = props.name;
  if (props.name === 'city capital') {
    key = 'city';
  }

  const classes = ['tile', props.name];
  if (props.anyone) { classes.push('anyone'); }
  if (props.clickable) { classes.push('clickable', `clickable-${props.clickable}`); }

  return (
    <svg viewBox="12 -12 443.012 524" className={classes.join(' ')} data-icon={props.icon} style={props.style}>
      <path className="base" d="M 216.5 4 L 428.999 127 L 428.999 373 L 216.5 496 L 4.001 373 L 4.001 127 Z" />
      <path className="outline-color" d="M 216.5 26 L 410 138 L 410 362 L 216.5 474 L 23 362 L 23 138 Z" />

      {tiles[key] ? tiles[key](props) : (<g />)}
      {props.asterisk ? (<text x="360" y="240" className="asterisk">*</text>) : ''}
      {props.children ? (
        <foreignObject x="0" y="0" width="435" height="503">
          <div xmlns="http://www.w3.org/1999/xhtml">
            {props.children}
          </div>
        </foreignObject>
      ) : ''}
    </svg>
  );
}
