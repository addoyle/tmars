import React from 'react';
import PropTypes from 'prop-types';
import { castArray } from 'lodash';
import './CardLayout.scss';
import classnames from 'classnames';

/**
 * Base level Card class
 */
const CardLayout = props => {
  return (
    <div
      className={classnames('card', props.type, {
        landscape: props.landscape,
        simple: props.simple
      })}
    >
      {props.children}
      {props.set && props.set !== 'base'
        ? castArray(props.set).map((set, i) => (
            <div key={i} className={classnames('set', set)} />
          ))
        : null}
      {props.todo ? <div className="todo">Incomplete</div> : null}
    </div>
  );
};

CardLayout.propTypes = {
  type: PropTypes.string.isRequired,
  set: PropTypes.string,
  landscape: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  simple: PropTypes.bool,
  todo: PropTypes.bool
};

export default CardLayout;
