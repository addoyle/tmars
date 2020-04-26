import React from 'react';

const GreeneryTile = () => (
  <g>
    <defs>
      <radialGradient
        id="tree-gradient"
        gradientUnits="userSpaceOnUse"
        cx="120.889"
        cy="104.265"
        r="110.5"
        gradientTransform="matrix(0, 1.546839, -1, 0, 225.153999, -82.730797)"
      >
        <stop offset="0" style={{ stopColor: 'hsl(135, 55%, 19%)' }}></stop>
        <stop offset="1" style={{ stopColor: 'hsl(135, 55%, 27%)' }}></stop>
      </radialGradient>
      <radialGradient
        id="greenery-gradient"
        gradientUnits="userSpaceOnUse"
        cx="216.5"
        cy="250"
        r="193.5"
      >
        <stop offset="0" style={{ stopColor: 'hsl(95, 65%, 50%)' }}></stop>
        <stop offset="1" style={{ stopColor: 'hsl(95, 65%, 40%)' }}></stop>
      </radialGradient>
      <linearGradient
        id="greenery-border"
        gradientUnits="userSpaceOnUse"
        x1="216.42"
        y1="238.226"
        x2="216.42"
        y2="456.34"
      >
        <stop offset="0" style={{ stopColor: '#59B22C' }}></stop>
        <stop offset="1" style={{ stopColor: '#295214' }}></stop>
      </linearGradient>
    </defs>
    <path
      transform="matrix(.9,0,0,.9,110,110)"
      className="tree"
      d="M 106.112 296 C 115.457 250.824 119.006 148.444 90.908 153.748 C 84.068 162.733 27.831 186.879 5.78 143.566 C -2.281 127.73 6.799 102.669 38.167 98.879 C 30.993 23.433 92.486 28.075 98.894 44.559 C 105.054 -36.118 220.307 10.213 203.207 101.926 C 238.623 113.201 234.695 188.044 144.835 163.26 C 135.179 194.181 147.111 278.917 159.137 293.82 L 106.112 296 Z"
    ></path>
    <g className="oxygen">
      <text x="290" y="160">
        +
      </text>
      <image href="/icons/oxygen.svg" width="140" height="140" x="355" y="60" />
    </g>
  </g>
);

export default GreeneryTile;
