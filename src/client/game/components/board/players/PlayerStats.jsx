import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import './PlayerStats.scss';
import CardRef from '../CardRef';
import classNames from 'classnames';
import Resources from './Resources';
import Tags from './Tags';
import Tiles from './Tiles';
import { Param, Resource, Tile } from '../../assets/Assets';

/**
 * Player Stats pane
 *
 * Shows player's resources, tags, cards played, etc.
 */
const PlayerStats = props => {
  const { pid, show } = props.gameStore.ui.playerStats;
  const player = props.gameStore.players[pid - 1];

  return (
    player && (
      <div
        className={classNames('player-stats', `player-${pid}`, { show })}
        onMouseDown={e => e.stopPropagation()}
        onMouseMove={e => e.stopPropagation()}
      >
        <div className="col-1">
          <div className="title-corp text-center m-top m-bottom">
            {player?.cards.corp?.length === 1 ? (
              <CardRef type="corp" card={player.cards.corp[0].card} />
            ) : null}
            <div
              className="close"
              onClick={() => (props.gameStore.ui.playerStats.show = false)}
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
          <Tiles player={player.number} />
        </div>
        {props.gameStore.phase === 'score' ? (
          <div className="col-1 score">
            <h2>Score Breakdown</h2>
            <div className="table">
              <div className="row">
                <div className="cell resources text-center">
                  <Resource name="tr" />
                </div>
                <div className="cell resources">{player.score.tr}</div>
              </div>

              <div className="row">
                <div className="cell resources text-center">
                  <span className="award">Awards</span>
                </div>
                <div className="cell resources">{player.score.awards}</div>
              </div>

              <div className="row">
                <div className="cell resources text-center">
                  <span className="milestone">Milestones</span>
                </div>
                <div className="cell resources">{player.score.milestones}</div>
              </div>

              <div className="row">
                <div className="cell resources text-center">
                  <Tile name="greenery" />
                  <Tile name="city" />
                </div>
                <div className="cell resources">{player.score.field}</div>
              </div>

              <div className="row">
                <div className="cell resources text-center">
                  <Param name="card automated" />
                  <Param name="card active" />
                  <Param name="card event" />
                </div>
                <div className="cell resources">{player.score.cards}</div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    )
  );
};

PlayerStats.propTypes = {
  gameStore: PropTypes.shape({
    ui: PropTypes.shape({
      playerStats: PropTypes.shape({
        show: PropTypes.bool,
        pid: PropTypes.number
      })
    }),
    players: PropTypes.arrayOf(
      PropTypes.shape({
        number: PropTypes.number,
        resources: PropTypes.object,
        production: PropTypes.production,
        tags: PropTypes.object,
        tiles: PropTypes.object,
        cards: PropTypes.shape({
          corp: PropTypes.arrayOf(PropTypes.shape({ card: PropTypes.string }))
        }),
        score: PropTypes.shape({
          tr: PropTypes.number,
          awards: PropTypes.number,
          milestones: PropTypes.number,
          field: PropTypes.number,
          cards: PropTypes.number
        })
      })
    ),
    phase: PropTypes.string,
    sets: PropTypes.arrayOf(PropTypes.string)
  })
};

export default inject('gameStore')(observer(PlayerStats));
