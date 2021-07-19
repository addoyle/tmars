import React from 'react';
import PropTypes from 'prop-types';

/**
 * Separator for cards
 *
 * @prop number Card number to display on separator
 */
const Separator = props => {
  let number = props.number;

  // If
  if (isNaN(number)) {
    number = +number.substring(1);
  }
  const binaryNum = (+number).toString(2);

  return (
    <div className="separator">
      {(binaryNum.length < 8 ? '0'.repeat(8 - binaryNum.length) : '') +
        binaryNum}
      <div className="number">{props.number}</div>
    </div>
  );
};

Separator.propTypes = {
  number: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default Separator;
