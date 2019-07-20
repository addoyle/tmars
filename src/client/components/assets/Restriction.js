import React from 'react';
import './Assets.scss';
import Tag from './Tag.js';
import Tile from './Tile.js';
import Param from './Param.js';
import Production from './Production.js';
import Resource from './Resource.js';

/**
 * Render a restriction
 *
 * @param restriction Restriction to render
 */
function renderRestriction(restriction) {
  if (restriction.tag) {
    return (
      <Tag name={restriction.tag} />
    );
  } else if (restriction.param) {
    return (
      <Param name={restriction.param} />
    )
  } else if (restriction.production) {
    return (
      <Production><Resource name={restriction.production} /></Production>
    )
  } else if (restriction.tile) {
    return (
      <Tile name={restriction.tile} />
    )
  }
}

/**
 * Card restriction
 *
 * @prop max    Boolean, true for maximum restriction, otherwise mininum restriction
 * @prop values Restriction values
 */
export default function Restriction(props) {
  return (
    <div className={`restriction ${props.max ? 'max' : ''}`}>
      {props.values.map((restriction, i) => (
        <span key={i}>{restriction.text ? restriction.text : renderRestriction(restriction)}</span>
      ))}
    </div>
  );
}
