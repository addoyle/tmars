import React from 'react';

/**
 * Separator for cards
 *
 * @prop number Card number to display on separator
 */
export default function Separator(props) {
  let number = props.number;
  if (isNaN(number)) {
    number = +(number.substring(1));
  }
  const binaryNum = number.toString(2);

  return (
    <div className="separator">
      {'0'.repeat(8 - binaryNum.length) + binaryNum}
      <div className="number">{'0'.repeat(3 - props.number.toString().length) + props.number}</div>
    </div>
  );
}
