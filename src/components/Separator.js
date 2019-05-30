import React from 'react';

export default function Separator(props) {
  const binaryNum = (+props.number).toString(2);

  return (
    <div className="separator">
      {'0'.repeat(8 - binaryNum.length) + binaryNum}
      <div className="number">{'0'.repeat(3 - props.number.toString().length) + props.number}</div>
    </div>
  );
}
