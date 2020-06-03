import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
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
const PlayerStats = props => {
  const { pid, show } = props.gameStore.playerStats;
  const player = props.gameStore.players[pid - 1];

  return (
    player && (
      <div
        className={classNames('player-stats', `player-${pid}`, { show })}
        onMouseDown={e => e.stopPropagation()}
        onMouseMove={e => e.stopPropagation()}
      >
        <div className="title-corp text-center m-top m-bottom">
          {player.corp ? <CardRef type="corp" card={player.corp} /> : null}
          <div
            className="close"
            onClick={() => (props.gameStore.playerStats.show = false)}
          >
            &times;
          </div>
        </div>

        <Resources
          resources={player.resources}
          production={player.production}
        />
        <Tags
          tags={player.tags}
          venus={props.gameStore.sets.includes('venus')}
        />
        <Tiles tiles={player.tiles} />
      </div>
    )
  );
};

PlayerStats.propTypes = {
  gameStore: PropTypes.shape({
    playerStats: PropTypes.shape({
      show: PropTypes.bool,
      pid: PropTypes.number
    }),
    players: PropTypes.arrayOf(
      PropTypes.shape({
        resources: PropTypes.object,
        production: PropTypes.production,
        tags: PropTypes.object,
        tiles: PropTypes.object,
        corp: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      })
    ),
    sets: PropTypes.arrayOf(PropTypes.string)
  })
};

export default inject('gameStore')(observer(PlayerStats));
