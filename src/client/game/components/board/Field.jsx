import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import './Field.scss';
import classnames from 'classnames';
import { Tile, Resource, Param, MegaCredit } from '../assets/Assets';

// NOTE:
// clickable values: city, greenery, special, ocean, capital
// type values: city, greenery, special, ocean
// names: greenery-placed, ocean-placed, city-placed, special-placed, capital-placed

/**
 * Mars, i.e. the playing field
 */
const Field = ({ gameStore }) => {
  const hasVenus = gameStore.sets.includes('venus');
  let id = 0;

  /**
   * Renders a resource on a space
   *
   * @param resource Resource array to be renderd
   * @param i        Index of resource to render
   * @return Rendered resource
   */
  const renderResource = (resource, i) => {
    if (resource && resource.length > i && resource[i]) {
      if (resource[i] === 'card') {
        return <Param name="card back" />;
      } else if (resource[i] === 'ocean') {
        return <Tile name="ocean" />;
      } else if (resource[i].mc) {
        return <MegaCredit value={resource[i].mc} />;
      } else {
        return <Resource name={resource[i]} />;
      }
    } else {
      return <Resource name="blank" />;
    }
  };

  return (
    <div className={classnames('field', { venus: hasVenus })}>
      <div className="tiles">
        {Object.keys(gameStore.detachedCities)
          .filter(
            city => hasVenus || gameStore.detachedCities[city].set !== 'venus'
          )
          .map((city, i) => (
            <div className={`${city} row`} key={i}>
              <Tile
                name={
                  gameStore.detachedCities[city].player
                    ? 'city-placed'
                    : 'blank'
                }
                clickable={
                  gameStore.detachedCities[city].clickable ? 'city' : undefined
                }
              >
                {gameStore.detachedCities[city].player ? (
                  <Tile name="city" />
                ) : null}
                {!gameStore.detachedCities[city].player ? (
                  <div className="rewards">
                    <div className="resources">
                      <Resource name="blank" />
                    </div>
                    <div className="resources">
                      <Resource name="blank" />
                    </div>
                    <div className="resources">
                      <Resource name="blank" />
                    </div>
                    <img className="city" src="/icons/city.svg" />
                    <div className="text">
                      {gameStore.detachedCities[city].label}
                    </div>
                  </div>
                ) : null}
                {gameStore.detachedCities[city].player ? (
                  <Resource
                    name={`player-${gameStore.detachedCities[city].player}`}
                  />
                ) : null}
              </Tile>
              {['ganymede', 'luna', 'dawn', 'torus'].includes(city) ? (
                <div className="dot">.</div>
              ) : null}
            </div>
          ))}

        {gameStore.field.map((row, r) => (
          <div key={r} className="row">
            {row.map((tile, i) => (
              <Tile
                key={i}
                id={id++}
                name={`${
                  tile.name ||
                  (tile.attrs && tile.attrs.includes('reserved-ocean')
                    ? 'reserved-ocean'
                    : 'blank')
                } ${tile.icon || ''}`}
                clickable={
                  gameStore.playerStatus?.tile &&
                  gameStore.playerStatus?.player.number ===
                    gameStore.player?.number
                    ? tile.clickable
                    : undefined
                }
                onClick={() => gameStore.placeTile(tile)}
              >
                {tile.name ? <Tile name={tile.type} icon={tile.icon} /> : null}
                {!tile.name ? (
                  <div className="rewards">
                    <div className="resources">
                      {renderResource(tile.resources, 0)}
                    </div>
                    <div className="resources">
                      {renderResource(tile.resources, 1)}
                      <Resource name="blank" />
                      {renderResource(tile.resources, 2)}
                    </div>
                    <div className="resources">
                      {renderResource(tile.resources, 3)}
                    </div>
                    {tile.attrs &&
                    tile.attrs.includes('reserved-noctis-city') ? (
                      <img className="city" src="/icons/city.svg" />
                    ) : null}
                    {tile.text ? <div className="text">{tile.text}</div> : null}
                  </div>
                ) : null}
                {tile.player ? (
                  <Resource name={`player-${tile.player}`} />
                ) : null}
              </Tile>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const tilePropType = PropTypes.shape({
  name: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.string,
  clickable: PropTypes.string,
  attrs: PropTypes.arrayOf(PropTypes.string),
  text: PropTypes.string,
  player: PropTypes.number,
  set: PropTypes.string,
  label: PropTypes.string
});

Field.propTypes = {
  gameStore: PropTypes.shape({
    field: PropTypes.arrayOf(PropTypes.arrayOf(tilePropType)),
    detachedCities: PropTypes.objectOf(tilePropType),
    sets: PropTypes.arrayOf(PropTypes.string),
    playerStatus: PropTypes.shape({
      player: PropTypes.shape({
        number: PropTypes.number
      }),
      tile: PropTypes.oneOf([PropTypes.string, PropTypes.object])
    }),
    player: PropTypes.shape({
      number: PropTypes.number
    }),
    placeTile: PropTypes.func
  })
};

export default inject('gameStore')(observer(Field));
