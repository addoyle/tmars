import React, { useState } from 'react';
import { inject } from 'mobx-react';
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

  const card = props.cardStore.get(props.type, props.card);

  return card ? (
    <HoverIntent
      timeout={300}
      onMouseOver={() => setShown(true)}
      onMouseOut={() => setShown(false)}
    >
      <span
        className={classNames('card-ref', card.constructor.name.toLowerCase())}
      >
        {card.title}
        <CardPreview card={props.card} show={shown} type={props.type} />
      </span>
    </HoverIntent>
  ) : (
    <div />
  );
};

CardRef.defaultProps = {
  type: 'project'
};

CardRef.propTypes = {
  card: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  type: PropTypes.string.isRequired,
  cardStore: PropTypes.shape({
    get: PropTypes.func.isRequired
  })
};

export default inject('cardStore')(CardRef);
