import React, { Component } from 'react';
import './PlayerStats.scss';
import CardRef from '../CardRef';
import classNames from 'classnames';
import Resources from './Resources';
import Tags from './Tags';
import Tiles from './Tiles';

/**
 * Player Stats pane
 *
 * Shows player's resources, tags, cards played, etc.
 */
export default class PlayerStats extends Component {
  render() {
    return (
      <div className={classNames('player-stats', `player-${this.props.pid}`, { show: this.props.show })} onMouseDown={e => e.stopPropagation()} onMouseMove={e => e.stopPropagation()}>
        {/* Corp title */}
        <div className="title-corp text-center m-top m-bottom">
          {this.props.player.corp ? (
            <CardRef type="corp" card={this.props.player.corp.number}>
              {this.props.player.corp.name}
            </CardRef>
          ) : ''}
          <div className="close" onClick={this.props.closeClick}>&times;</div>
        </div>

        <Resources resources={this.props.player.resources} production={this.props.player.production} />
        <Tags tags={this.props.player.tags} />
        <Tiles tiles={this.props.player.tiles} />
      </div>
    );
  }
}
