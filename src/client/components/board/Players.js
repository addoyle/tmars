import React, { Component } from 'react';
import './Players.scss';
import Player from './Player';
import PlayerStats from './PlayerStats';

/**
 * Shows a list of players on the top left
 */
export default class Players extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statPlayer: { resources: {}, production: {}, tags: {}, tiles: {}},
      showStats: false,
      pid: 1
    }
  }

  // Open/close player pane
  toggleStats = i => () => this.setState({
    statPlayer: this.props.players[i],
    showStats: !this.state.showStats || this.state.statPlayer !== this.props.players[i],
    pid: i + 1
  });

  // Close the pane
  closeClick = () => this.setState({showStats: false});

  render() {
    return (
      <div className="players">
        <ul>
        {this.props.players.map((player, i) => (
          <li key={i}>
            <Player
              pid={i + 1}
              player={player}
              turn={i + 1 === +this.props.turn}
              onClick={this.toggleStats(i)} />
          </li>
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
