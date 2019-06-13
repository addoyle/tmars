import React from 'react';
import './Assets.scss';

const euro = (
  <span class="euro">&euro;</span>
)

export default function MegaCredit(props) {
  return (
    <div className="mc"><span className="value">{props.value || euro}</span></div>
  );
}
