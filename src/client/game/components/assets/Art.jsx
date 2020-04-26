import React from 'react';
import PropTypes from 'prop-types';
import { Resource } from './Assets';

/**
 * Card art
 *
 * @prop art Art to display on the card
 */
const Art = props => (
  <div className="image">
    {props.art}
    {props.resources ? (
      <div className="resources image-resources">
        <span>{props.resources.value}</span>
        <Resource name={props.resources.type} />
      </div>
    ) : null}
  </div>
);

Art.propTypes = {
  art: PropTypes.string.isRequired,
  resources: PropTypes.shape({
    type: PropTypes.string,
    value: PropTypes.number
  })
};

export default Art;
