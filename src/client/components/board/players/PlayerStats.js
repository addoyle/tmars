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
export default function PlayerStats(props) {
  return (
    <div
      className={classNames('player-stats', `player-${props.pid}`, { show: props.show })}
      onMouseDown={e => e.stopPropagation()}
      onMouseMove={e => e.stopPropagation()}
    >
      <div className="title-corp text-center m-top m-bottom">
        {props.player.corp ? (
          <CardRef type="corp" card={props.player.corp.number} />
        ) : ''}
        <div className="close" onClick={props.closeClick}>&times;</div>
      </div>

      <Resources resources={props.player.resources} production={props.player.production} />
      <Tags tags={props.player.tags} />
      <Tiles tiles={props.player.tiles} />
    </div>
  );
}
