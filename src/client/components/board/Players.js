import React, { Component } from 'react';
import './Player.scss';
import Player from './Player';

export default class Players extends Component {
  render() {
    return (
      <div className="players">
        {this.props.players.map((player, i) => (
          <Player pid={i + 1} player={player} turn={i + 1 === +this.props.turn} />
        ))}
      </div>
    );
  }
}
