import React, { Component } from 'react';
import './Player.scss';
import { Resource } from '../assets/Assets';

/**
 * A single player from the player list
 */
export default class Player extends Component {
  render() {
    const classes = ['player'];
    if (this.props.turn) { classes.push('active'); }
    if (this.props.player.passed) { classes.push('passed'); }

    return (
      <div className={classes.join(' ')} onClick={this.props.onClick}>
        <Resource name={`player-${this.props.pid}`} />
        <div className={`points ${this.props.player.tr % 5 !== 0 ? 'o' : ''}`}><span className="value">{this.props.player.tr}</span></div>
        <span>{this.props.player.name}</span>
        {this.props.player.startingPlayer ? (
          <span className="starting-player" />
        ) : null}
      </div>
    );
  }
}
