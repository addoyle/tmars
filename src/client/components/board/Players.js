import React, { Component } from 'react';
import './Player.scss';
import Player from './Player';
import PlayerStats from './PlayerStats';

export default class Players extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statPlayer: { resources: {}, production: {}, tags: {}},
      showStats: false,
      pid: 1
    }

    this.toggleStats = this.toggleStats.bind(this);
    this.closeClick = this.closeClick.bind(this);
  }

  toggleStats(player, i) {
    return e => this.setState({
      statPlayer: player,
      showStats: !this.state.showStats || this.state.statPlayer !== player,
      pid: i + 1
    });
  }

  closeClick() {
    this.setState({showStats: false});
  }

  render() {
    return (
      <div className="players">
        <ul>
        {this.props.players.map((player, i) => (
          <li><Player pid={i + 1} player={player} turn={i + 1 === +this.props.turn} onClick={this.toggleStats(player, i)} /></li>
        ))}
        </ul>

        <PlayerStats
          player={this.state.statPlayer}
          pid={this.state.pid}
          show={this.state.showStats}
          closeClick={this.closeClick}
          />
      </div>
    );
  }
}
