import React from 'react';
import PropTypes from 'prop-types';
import { Tile } from '../../assets/Assets';
import { inject, observer } from 'mobx-react';
import Tooltip from '@material-ui/core/Tooltip';
import { capitalize } from 'lodash';

/**
 * Render the tiles portion of the player stats
 *
 * @param {*} props
 */
const Tiles = props => {
  const anyone = true;
  const gameStore = props.gameStore;
  const tiles = [
    { type: 'city' },
    { type: 'greenery' },
    { type: 'special' },
    { type: 'ocean' }
  ];

  const onMarsCount = opts =>
    gameStore.field
      .flat()
      .filter(
        t =>
          (t.type || '').includes(opts.type) &&
          (opts.anyone || t.player === props.player || t.type === 'ocean')
      ).length;

  const offMarsCount = opts =>
    Object.values(gameStore.offMars).filter(
      t =>
        opts.type === 'city' &&
        t.type === 'city' &&
        (opts.anyone || t.player === props.player)
    ).length;

  return (
    <>
      <div className="title m-top text-center">Tiles</div>
      <div className="flex section">
        {tiles.map((tile, i) => (
          <Tooltip
            title={`${capitalize(tile.type)} tiles`}
            arrow
            key={`tile-${props.player}-${i}`}
          >
            <div className="col-1 text-center">
              <div className="flex">
                <div className="resources col-1 text-right middle">
                  <span>{onMarsCount(tile) + offMarsCount(tile)}</span>
                </div>
                <div className="resources col-1 text-center">
                  <Tile name={tile.type} anyone={tile.anyone} />
                </div>
              </div>
            </div>
          </Tooltip>
        ))}
      </div>

      <div className="flex section middle m-top">
        <div className="flex middle col-1">
          <Tooltip title="Total owned tiles" arrow>
            <div className="resources col-1 text-right middle flex center-items">
              <span>
                {
                  gameStore.field
                    .flat()
                    .concat(Object.values(gameStore.offMars))
                    .filter(t => t.player === props.player).length
                }
              </span>
              <Tile name="blank-city capital" noIcon>
                <div className="icon-text">X</div>
              </Tile>
            </div>
          </Tooltip>

          <Tooltip title="All city tiles" arrow>
            <div className="resources col-1 text-right middle">
              <span>
                {onMarsCount({ type: 'city', anyone }) +
                  offMarsCount({ type: 'city', anyone })}
              </span>
              <Tile name="city" anyone />
            </div>
          </Tooltip>
        </div>

        <div className="on-mars flex col-1">
          {[{ type: 'city' }, { type: 'city', anyone }].map((tile, i) => (
            <Tooltip
              title={`${tile.anyone ? 'All ' : 'Your '}${capitalize(
                tile.type
              )} tiles ON MARS`}
              arrow
              key={`tile-${props.player}-${i}-onmars`}
            >
              <div className="col-1 text-center">
                <div className="flex">
                  <div className="resources col-1 text-right middle">
                    <span>{onMarsCount(tile)}</span>
                  </div>
                  <div className="resources col-1 text-center">
                    <Tile name="city" anyone={tile.anyone} />
                  </div>
                </div>
              </div>
            </Tooltip>
          ))}
        </div>
      </div>
    </>
  );
};

Tiles.propTypes = {
  player: PropTypes.number,
  gameStore: PropTypes.shape({
    player: PropTypes.shape({
      number: PropTypes.number
    }),
    field: PropTypes.array,
    offMars: PropTypes.object
  })
};

export default inject('gameStore')(observer(Tiles));
