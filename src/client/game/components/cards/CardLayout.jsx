import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { castArray, isEmpty, isEqual, isNil } from 'lodash';
import './CardLayout.scss';
import classnames from 'classnames';
import { inject } from 'mobx-react';
import { MegaCredit } from '../assets/Assets';
import Restriction from '../assets/Restriction';
import { displayRequirement } from '../../../util/util';

/**
 * Base level Card class
 */
const CardLayout = props => {
  const costModified =
    !isNil(props.modifiedCost) && props.modifiedCost !== props.cost;
  const reqModified =
    !isEmpty(props.modifiedReqs) &&
    !isEqual(props.modifiedReqs, props.restriction);

  return (
    <div
      className={classnames('card', props.type, {
        landscape: props.landscape,
        simple: props.simple,
        modified: costModified || reqModified
      })}
    >
      {costModified || reqModified ? (
        <div className="modifier">
          {costModified ? (
            <div className="cost">
              <MegaCredit value={props.modifiedCost} modified />
            </div>
          ) : null}
          {reqModified ? (
            <div className="req">
              <Restriction
                values={
                  props.modifiedReqs && displayRequirement(props.modifiedReqs)
                }
                max={props.modifiedReqs && props.modifiedReqs.max}
              />
            </div>
          ) : null}
        </div>
      ) : null}
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
  restriction: PropTypes.object,
  set: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  landscape: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  cost: PropTypes.number,
  modifiedCost: PropTypes.number,
  modifiedReqs: PropTypes.object,
  gameStore: PropTypes.shape({
    showCurrentCard: PropTypes.func
  }),
  simple: PropTypes.bool,
  todo: PropTypes.bool,
  showZoom: PropTypes.bool
};

export default inject('gameStore')(CardLayout);
