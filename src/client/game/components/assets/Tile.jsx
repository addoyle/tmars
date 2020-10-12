import React from 'react';
import PropTypes from 'prop-types';
import OceanTile from './tiles/OceanTile';
import CityTile from './tiles/CityTile';
import GreeneryTile from './tiles/GreeneryTile';
import SpecialTile from './tiles/SpecialTile';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';

const tiles = (type, props) => {
  switch (type) {
    case 'ocean':
      return <OceanTile />;
    case 'reserved-ocean':
      return <OceanTile reserved />;
    case 'city':
      return <CityTile />;
    case 'blank-city':
      return <CityTile noIcon />;
    case 'greenery':
      return <GreeneryTile {...props} />;
    case 'special':
      return <SpecialTile {...props} />;
    case 'any':
    case 'blank':
    default:
      return <g />;
  }
};

/**
 * Tile
 *
 * @prop name      Tile type (e.g. City, greenery, etc.)
 * @prop anyone    Boolean, true affects anyone (red border), otherwise false
 * @prop clickable Tile becomes clickable with specified type (city, greenery, etc.)
 * @prop icon      Icon to show on the tile (e.g. city, greenery, etc.)
 * @prop asterisk  Boolean, true to show an asterisk, otherwise false
 */
const Tile = props => {
  let key = props.name?.trim();
  if (props.name === 'city capital') {
    key = 'city';
  }

  const gameStore = props.gameStore;

  return (
    <svg
      viewBox="12 -12 443.012 524"
      className={classnames('tile', props.name, {
        anyone: props.anyone,
        clickable: props.clickable,
        [`clickable-${props.clickable}`]: props.clickable
      })}
      data-icon={props.icon}
      style={props.style}
    >
      <path
        className="base"
        d="M 216.5 4 L 428.999 127 L 428.999 373 L 216.5 496 L 4.001 373 L 4.001 127 Z"
        onClick={() => gameStore.placeTile(props.id)}
      />
      <path
        className="outline-color"
        d="M 216.5 26 L 410 138 L 410 362 L 216.5 474 L 23 362 L 23 138 Z"
      />

      {tiles(key, props)}
      {props.asterisk ? (
        <text x="360" y="240" className="asterisk">
          *
        </text>
      ) : null}
      {props.children ? (
        <foreignObject x="0" y="0" width="435" height="503">
          <div xmlns="http://www.w3.org/1999/xhtml">{props.children}</div>
        </foreignObject>
      ) : null}
    </svg>
  );
};

Tile.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  icon: PropTypes.string,
  clickable: PropTypes.string,
  anyone: PropTypes.bool,
  asterisk: PropTypes.bool,
  style: PropTypes.object,
  noOxygen: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  gameStore: PropTypes.shape({
    placeTile: PropTypes.func
  })
};

export default inject('gameStore')(observer(Tile));
