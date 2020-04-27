import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import './CardPreview.scss';
import classNames from 'classnames';
import CorporationLayout from '../cards/CorporationLayout';
import ProjectLayout from '../cards/ProjectLayout';

/**
 * Displays a card as a popup
 */
const CardPreview = props => {
  const card = props.cardStore.get(props.type, props.card);

  // TODO
  // const resources = props.resources;

  return (
    <div
      className={classNames('card-preview', {
        show: props.show && card,
        simple: props.simple
      })}
    >
      {!card ? (
        <div>Loading...</div>
      ) : props.type === 'corp' ? (
        <CorporationLayout {...card} type="corp" />
      ) : (
        <ProjectLayout {...card} type={card.constructor.name.toLowerCase()} />
      )}
    </div>
  );
};

CardPreview.defaultProps = {
  type: 'project',
  show: true
};

CardPreview.propTypes = {
  card: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  type: PropTypes.string.isRequired,
  show: PropTypes.bool,
  simple: PropTypes.bool,
  cardStore: PropTypes.shape({
    normalize: PropTypes.func.isRequired,
    get: PropTypes.func.isRequired
  })
};

export default inject('cardStore')(observer(CardPreview));
