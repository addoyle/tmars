import React, { Component } from 'react';
import './Player.scss';
import { Resource, MegaCredit } from '../assets/Assets'

export default class Players extends Component {
  render() {
    return (
      <div className={`player ${this.props.turn ? 'active' : ''}`}>
        <Resource name={`player-${this.props.pid}`} />
        <MegaCredit value={this.props.player.tr} />
        <span>{this.props.player.name}</span>
      </div>
    );
  }
}
