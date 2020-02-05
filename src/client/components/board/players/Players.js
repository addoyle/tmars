import React, { Component } from 'react';
import { inject, observer} from 'mobx-react';
import './Players.scss';
import Player from './Player';
import PlayerStats from './PlayerStats';
import classNames from 'classnames';

/**
 * Shows a list of players on the top left
 */
@inject('boardStore')
@observer
export default class Players extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showStats: true,
      pid: 1
    }
  }

  // Open/close player pane
  toggleStats = i => () => this.setState({
    statPlayer: this.props.boardStore.players[i],
    showStats: !this.state.showStats || this.state.statPlayer !== this.props.boardStore.players[i],
    pid: i + 1
  });

  // Close the pane
  closeClick = () => this.setState({showStats: false});

  render() {
    // TODO fix once user sessions are set up
    this.state.statPlayer = this.state.statPlayer || this.props.boardStore.players[0];

    return this.props.boardStore.players.length ? (
      <div className="players">
        <div className={classNames('player-selector', `player-${this.state.pid}`, { active: this.state.pid === +this.props.boardStore.turn, hidden: !this.state.showStats })} />

        <ul>
          {this.props.boardStore.players.map((player, i) => (
            <li key={i}>
              <Player
                pid={i + 1}
                player={player}
                turn={i + 1 === +this.props.boardStore.turn}
                onClick={this.toggleStats(i)}
              />
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
    ) : null;
  }
}
