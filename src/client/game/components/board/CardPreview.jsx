import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import './CardPreview.scss';
import classNames from 'classnames';
import CorporationLayout from '../cards/CorporationLayout';
import ProjectLayout from '../cards/ProjectLayout';
import { isEmpty, isString } from 'lodash';
import { GLOBAL_PARAMS } from '../../../../shared/game/constants';

/**
 * Displays a card as a popup
 */
const CardPreview = props => {
  const card = isString(props.card) ? { card: props.card } : props.card;
  const cardObj = props.cardStore.get(card?.card);

  const resource = cardObj?.resource && {
    type: cardObj.resource,
    value: card?.cardResource || 0
  };

  // Apply cost modifiers (e.g. Research Outpost)
  const modifiedCost = props.gameStore.calculateCost(
    cardObj,
    props.costModifiers
  );
  const req = cardObj?.restriction;
  const param = req?.param ?? req?.tile;
  const modifiedReqs =
    req && (req.param || req.tile === 'ocean') && !isEmpty(props.reqModifiers)
      ? {
          ...req,
          value: req.max
            ? Math.min(
                req.value + props.reqModifiers[param],
                GLOBAL_PARAMS[param.toUpperCase()].MAX
              )
            : Math.max(
                req.value - props.reqModifiers[param],
                GLOBAL_PARAMS[param.toUpperCase()].MIN
              )
        }
      : null;

  return (
    <div
      className={classNames('card-preview', {
        show: props.show && cardObj,
        simple: props.gameStore.settings.simple,
        select: card?.select
      })}
    >
      {!cardObj ? (
        <div>Loading...</div>
      ) : cardObj.constructor.name === 'Corporation' ? (
        <CorporationLayout
          {...cardObj}
          resource={props.showResources ? resource : null}
          showZoom={props.showZoom}
        />
      ) : (
        <ProjectLayout
          {...cardObj}
          resource={props.showResources ? resource : null}
          showZoom={props.showZoom}
          modifiedCost={modifiedCost}
          modifiedReqs={modifiedReqs}
        />
      )}
    </div>
  );
};

CardPreview.defaultProps = {
  type: 'project',
  show: true,
  showResources: false
};

CardPreview.propTypes = {
  card: PropTypes.oneOfType([
    PropTypes.shape({
      card: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      select: PropTypes.bool,
      resources: PropTypes.objectOf(PropTypes.number)
    }),
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ]).isRequired,
  show: PropTypes.bool,
  showResources: PropTypes.bool,
  cardStore: PropTypes.shape({
    get: PropTypes.func.isRequired
  }),
  gameStore: PropTypes.shape({
    settings: PropTypes.shape({
      simple: PropTypes.bool
    }),
    calculateCost: PropTypes.func
  }),
  costModifiers: PropTypes.object,
  reqModifiers: PropTypes.object,
  showZoom: PropTypes.bool
};

export default inject('cardStore', 'gameStore')(observer(CardPreview));
