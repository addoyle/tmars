import React, { Component } from 'react';
import './Player.scss';
import Player from './Player';
import PlayerStats from './PlayerStats';

export default class Players extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statPlayer: null
    }

    this.toggleStats = this.toggleStats.bind(this);
  }

  toggleStats(player, i) {
    return e => this.setState({statPlayer: this.state.statPlayer === player ? null : player});
  }

  render() {
    return (
      <div className="players">
        <ul>
        {this.props.players.map((player, i) => (
          <li><Player pid={i + 1} player={player} turn={i + 1 === +this.props.turn} onClick={this.toggleStats(player, i)} /></li>
        ))}
        </ul>

        <PlayerStats player={this.state.statPlayer} />
      </div>
    );
  }
}
