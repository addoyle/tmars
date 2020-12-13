import React from 'react';
import PropTypes from 'prop-types';
import { Tile } from '../../assets/Assets';
import { inject, observer } from 'mobx-react';

/**
 * Render the tiles portion of the player stats
 *
 * @param {*} props
 */
const Tiles = ({ gameStore }) => {
  const anyone = true;
  const tiles = [
    { type: 'city' },
    { type: 'greenery' },
    { type: 'city', anyone },
    { type: 'greenery', anyone }
  ];

  const onMarsCount = opts =>
    gameStore.field
      .flat()
      .filter(
        t =>
          opts.type === t.type &&
          (opts.anyone || t.player === gameStore.player.number)
      ).length;

  const offMarsCount = opts =>
    Object.keys(gameStore.offMars).filter(
      t =>
        t.type === 'city' &&
        (opts.anyone || t.player === gameStore.player?.number)
    ).length;
  return (
    <>
      <div className="title m-top text-center">Tiles</div>
      <div className="flex section">
        {tiles.map((tile, i) => (
          <div className="col-1 text-center" key={i}>
            <div className="flex">
              <div className="resources col-1 text-right middle">
                <span>{onMarsCount(tile) + offMarsCount(tile)}</span>
              </div>
              <div className="resources col-1 text-center">
                <Tile name={tile.type} anyone={tile.anyone} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex section on-mars">
        {[{ type: 'city' }, { type: 'city', anyone }].map((tile, i) => (
          <div className="col-1 text-center" key={i}>
            <div className="flex">
              <div className="resources col-1 text-right middle">
                <span>{onMarsCount(tile)}</span>
              </div>
              <div className="resources col-1 text-center">
                <Tile name="city" anyone={tile.anyone} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

Tiles.propTypes = {
  tiles: PropTypes.shape({
    city: PropTypes.number,
    greenery: PropTypes.number,
    special: PropTypes.number
  }),
  gameStore: PropTypes.shape({
    player: PropTypes.shape({
      number: PropTypes.number
    }),
    field: PropTypes.array,
    offMars: PropTypes.object
  })
};

export default inject('gameStore')(observer(Tiles));
