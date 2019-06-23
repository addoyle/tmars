import React, { Component } from 'react';
import './Board.scss';
import { Tile } from '../assets/Assets'

export default class Field extends Component {
  render() {
    const tharsis = [];

    for (var i = 0; i < 9; i++) {
      tharsis.push([]);
      var n = 9 - Math.abs(i + 5 - 9);
      for (var j = 0; j < n; j++) {
        tharsis[i].push(<Tile name="blank" />);
      }
    }

    tharsis[4][4] = (<Tile name="ocean" />);
    tharsis[4][3] = (<Tile name="city" />);
    tharsis[5][3] = (<Tile name="greenery" />);

    return (
      <div className="field">
        <div className="tiles">
          {tharsis.map(row => (
            <div className="row">
              {row.map(tile => (tile))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
