import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import './CardPreview.scss';
import classNames from 'classnames';
import CorporationLayout from '../cards/CorporationLayout';
import ProjectLayout from '../cards/ProjectLayout';
import { isString } from 'lodash';

/**
 * Displays a card as a popup
 */
const CardPreview = props => {
  const card = isString(props.card) ? { card: props.card } : props.card;
  const cardObj = props.cardStore.get(props.type, card.card);

  // TODO
  // const resources = props.resources;

  return (
    <div
      className={classNames('card-preview', {
        show: props.show && cardObj,
        simple: props.gameStore.settings.simple,
        select: card.select
      })}
    >
      {!cardObj ? (
        <div>Loading...</div>
      ) : props.type === 'corp' ? (
        <CorporationLayout {...cardObj} type="corp" />
      ) : (
        <ProjectLayout
          {...cardObj}
          type={cardObj.constructor.name.toLowerCase()}
        />
      )}
    </div>
  );
};

CardPreview.defaultProps = {
  type: 'project',
  show: true
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
  type: PropTypes.string.isRequired,
  show: PropTypes.bool,
  cardStore: PropTypes.shape({
    normalize: PropTypes.func.isRequired,
    get: PropTypes.func.isRequired
  }),
  gameStore: PropTypes.shape({
    settings: PropTypes.shape({
      simple: PropTypes.bool
    })
  })
};

export default inject('cardStore', 'gameStore')(observer(CardPreview));
