import React from 'react';
import './Assets.scss';

// Euro logo to display when no value is set
const euro = (<span class="euro">&euro;</span>);

/**
 * MegaCredit
 *
 * @prop value  Value to display on MC icon
 * @prop anyone Boolean, true affects anyone (red border), otherwise false
 */
export default function MegaCredit(props) {
  return (
    <div className={`mc ${props.anyone ? 'anyone' : ''}`}><span className="value">{props.value || euro}</span></div>
  );
}
