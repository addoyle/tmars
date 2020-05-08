import React from 'react';
import PropTypes from 'prop-types';
import Tag from './Tag';
import Tile from './Tile';
import Param from './Param';
import Production from './Production';
import Resource from './Resource';
import classNames from 'classnames';

/**
 * Render a restriction
 *
 * @param restriction Restriction to render
 */
function renderRestriction(restriction) {
  if (restriction.tag) {
    return <Tag name={restriction.tag} anyone={restriction.anyone} />;
  } else if (restriction.param) {
    return <Param name={restriction.param} />;
  } else if (restriction.resource) {
    return <Resource name={restriction.resource} />;
  } else if (restriction.production) {
    return (
      <Production>
        <Resource name={restriction.production} anyone={restriction.anyone} />
      </Production>
    );
  } else if (restriction.tile) {
    return <Tile name={restriction.tile} anyone={restriction.anyone} />;
  }
}

/**
 * Card restriction
 *
 * @prop max    Boolean, true for maximum restriction, otherwise mininum restriction
 * @prop values Restriction values
 */
const Restriction = ({ max, values }) => (
  <div className={classNames('restriction', { max })}>
    {values.map((restriction, i) => (
      <span key={i}>
        {restriction.text ? restriction.text : renderRestriction(restriction)}
      </span>
    ))}
  </div>
);

Restriction.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      tile: PropTypes.tile,
      tag: PropTypes.string,
      param: PropTypes.param,
      production: PropTypes.production,
      anyone: PropTypes.bool
    })
  ),
  max: PropTypes.bool
};

export default Restriction;
