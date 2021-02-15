import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import './Field.scss';
import classnames from 'classnames';
import { Tile, Resource, Param, MegaCredit } from '../assets/Assets';

const offMars = {
  ganymede: {
    label: 'Ganymede Colony'
  },
  phobos: {
    label: 'Phobos Space Haven'
  },
  torus: {
    label: 'Stanford Torus',
    set: 'promo'
  },
  maxwell: {
    label: 'Maxwell Base',
    set: 'venus'
  },
  stratopolis: {
    label: 'Stratopolis',
    set: 'venus'
  },
  luna: {
    label: 'Luna Metropolis',
    set: 'venus'
  },
  dawn: {
    label: 'Dawn City',
    set: 'venus'
  }
};

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
      } else if (resource[i].megacredit) {
        return <MegaCredit value={resource[i].megacredit} />;
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
        {Object.keys(gameStore.offMars)
          .filter(city => hasVenus || offMars[city].set !== 'venus')
          .map((city, i) => (
            <div className={`${city} row`} key={i}>
              <Tile
                name={gameStore.offMars[city].player ? 'city-placed' : 'blank'}
                clickable={
                  gameStore.offMars[city].clickable ? 'city' : undefined
                }
              >
                {gameStore.offMars[city].player ? <Tile name="city" /> : null}
                {!gameStore.offMars[city].player ? (
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
                    <div className="text">{offMars[city].label}</div>
                  </div>
                ) : null}
                {gameStore.offMars[city].player ? (
                  <Resource name={`player-${gameStore.offMars[city].player}`} />
                ) : null}
              </Tile>
              {['ganymede', 'luna', 'dawn', 'torus'].includes(city) ? (
                <div className="dot">.</div>
              ) : null}
            </div>
          ))}

        {gameStore.field.map((row, r) => (
          <div key={`field-row-${r}`} className="row">
            {row.map((area, i) => (
              <Tile
                key={`area-${r}-${i}`}
                id={id++}
                name={`${
                  area.name ||
                  (area.attrs && area.attrs.includes('reserved-ocean')
                    ? 'reserved-ocean'
                    : 'blank')
                } ${area.icon || ''}`}
                clickable={
                  gameStore.playerStatus?.type === 'prompt-tile' &&
                  gameStore.playerStatus?.player.number ===
                    gameStore.player?.number
                    ? area.clickable
                    : undefined
                }
                onClick={() => gameStore.placeTile(area)}
              >
                {area.name ? <Tile name={area.type} icon={area.icon} /> : null}
                {!area.name ? (
                  <div className="rewards">
                    <div className="resources">
                      {renderResource(area.resources, 0)}
                    </div>
                    <div className="resources">
                      {renderResource(area.resources, 1)}
                      <Resource name="blank" />
                      {renderResource(area.resources, 2)}
                    </div>
                    <div className="resources">
                      {renderResource(area.resources, 3)}
                    </div>
                    {area.attrs &&
                    area.attrs.includes('reserved-noctis-city') ? (
                      <img className="city" src="/icons/city.svg" />
                    ) : null}
                    {area.text ? <div className="text">{area.text}</div> : null}
                  </div>
                ) : null}
                {area.player ? (
                  <Resource name={`player-${area.player}`} />
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
    offMars: PropTypes.objectOf(tilePropType),
    sets: PropTypes.arrayOf(PropTypes.string),
    playerStatus: PropTypes.shape({
      type: PropTypes.string,
      player: PropTypes.shape({
        number: PropTypes.number
      }),
      tile: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    }),
    player: PropTypes.shape({
      number: PropTypes.number
    }),
    placeTile: PropTypes.func
  })
};

export default inject('gameStore')(observer(Field));
