import React, { Component } from 'react';
import './PlayerStats.scss';
import { Tag, MegaCredit, Resource, Production } from '../assets/Assets';

export default class PlayerStats extends Component {
  render() {
    return (
      <div className={`player-stats ${this.props.player ? 'show' : ''}`}>

      </div>
    );
  }
}
