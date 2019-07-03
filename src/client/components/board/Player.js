import React, { Component } from 'react';
import './Player.scss';
import { Resource } from '../assets/Assets'

export default class Players extends Component {
  render() {
    const classes = ['player'];
    if (this.props.turn) { classes.push('active'); }
    if (this.props.player.passed) { classes.push('passed'); }

    return (
      <div className={classes.join(' ')}>
        <Resource name={`player-${this.props.pid}`} />
        <div className={`points ${this.props.player.tr % 5 !== 0 ? 'o' : ''}`}><span className="value">{this.props.player.tr}</span></div>
        <span>{this.props.player.name}</span>
      </div>
    );
  }
}
