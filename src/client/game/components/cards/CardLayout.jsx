import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { castArray } from 'lodash';
import './CardLayout.scss';
import classnames from 'classnames';
import { inject } from 'mobx-react';

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
      {props.showZoom ? (
        <div
          className="zoom"
          onClick={e => {
            e.stopPropagation();
            props.gameStore.showCurrentCard(
              { card: props.number },
              ['automated', 'active', 'event'].includes(props.type)
                ? 'project'
                : props.type
            );
          }}
        >
          <FontAwesomeIcon icon="search-plus" />
        </div>
      ) : null}
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
  number: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  set: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  landscape: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  gameStore: PropTypes.shape({
    showCurrentCard: PropTypes.func
  }),
  simple: PropTypes.bool,
  todo: PropTypes.bool,
  showZoom: PropTypes.bool
};

export default inject('gameStore')(CardLayout);
