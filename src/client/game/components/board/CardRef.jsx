import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import './CardRef.scss';
import CardPreview from './CardPreview';
import classNames from 'classnames';
import HoverIntent from '../../../util/HoverIntent';

/**
 * Shows a card popup on hover
 */
const CardRef = props => {
  const [shown, setShown] = useState(false);

  const card = props.cardStore.get(props.card);

  return (
    <HoverIntent
      timeout={300}
      onMouseOver={() => setShown(true)}
      onMouseOut={() => setShown(false)}
    >
      <span
        className={classNames('card-ref', card?.type || props.type)}
        onClick={props.onClick || (() => {})}
      >
        {card ? card.title : props.card}
        <CardPreview card={props.card} show={shown} type={props.type} />
      </span>
    </HoverIntent>
  );
};

CardRef.defaultProps = {
  type: 'project'
};

CardRef.propTypes = {
  card: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  cardStore: PropTypes.shape({
    get: PropTypes.func.isRequired
  })
};

export default inject('cardStore')(observer(CardRef));
