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
const Field = props => {
  const { field, detachedCities } = props.gameStore;
  const hasVenus = props.gameStore.sets.includes('venus');
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
        {Object.keys(detachedCities)
          .filter(city => hasVenus || detachedCities[city].set !== 'venus')
          .map((city, i) => (
            <div className={`${city} row`} key={i}>
              <Tile
                name={detachedCities[city].player ? 'city-placed' : 'blank'}
                clickable={detachedCities[city].clickable ? 'city' : false}
              >
                {detachedCities[city].player ? <Tile name="city" /> : ''}
                {!detachedCities[city].player ? (
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
                    <div className="text">{detachedCities[city].label}</div>
                  </div>
                ) : (
                  ''
                )}
                {detachedCities[city].player ? (
                  <Resource name={`player-${detachedCities[city].player}`} />
                ) : null}
              </Tile>
              {['ganymede', 'luna', 'dawn'].includes(city) ? (
                <div className="dot">.</div>
              ) : null}
            </div>
          ))}

        {field.field.map((row, r) => (
          <div key={r} className="row">
            {row.map((tile, i) => (
              <Tile
                key={i}
                name={`${
                  tile.name ||
                  (tile.attrs && tile.attrs.includes('reserved-ocean')
                    ? 'reserved-ocean'
                    : 'blank')
                } ${tile.icon || ''}`}
                clickable={tile.clickable}
              >
                {tile.name ? <Tile name={tile.type} icon={tile.icon} /> : ''}
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
                    {tile.attrs && tile.attrs.includes('noctis-city') ? (
                      <img className="city" src="/icons/city.svg" />
                    ) : (
                      ''
                    )}
                    {tile.text ? <div className="text">{tile.text}</div> : ''}
                  </div>
                ) : (
                  ''
                )}
                {tile.player ? <Resource name={`player-${tile.player}`} /> : ''}
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
  clickable: PropTypes.bool,
  attrs: PropTypes.arrayOf(PropTypes.string),
  text: PropTypes.string,
  player: PropTypes.number,
  set: PropTypes.string
});

Field.propTypes = {
  gameStore: PropTypes.shape({
    field: PropTypes.shape({
      field: PropTypes.arrayOf(PropTypes.arrayOf(tilePropType))
    }),
    detachedCities: PropTypes.objectOf(tilePropType),
    sets: PropTypes.arrayOf(PropTypes.string)
  })
};

export default inject('gameStore')(observer(Field));
