import React, { Component } from 'react';
import './Player.scss';
import { Resource } from '../../assets/Assets';
import classNames from 'classnames';

/**
 * A single player from the player list
 */
export default class Player extends Component {
  render() {
    return (
      <div
        className={classNames('player', {
          active: this.props.turn,
          passed: this.props.player.passed
        })}
        onClick={this.props.onClick}
        onMouseDown={e => e.stopPropagation()}
        onMouseMove={e => e.stopPropagation()}
      >
        <Resource name={`player-${this.props.pid}`} />
        <div className={classNames('points', { o: this.props.player.tr % 5 !== 0 })}><span className="value">{this.props.player.tr}</span></div>
        <span>{this.props.player.name}</span>
        {this.props.player.startingPlayer ? (
          <span className="starting-player" />
        ) : null}
      </div>
    );
  }
}
