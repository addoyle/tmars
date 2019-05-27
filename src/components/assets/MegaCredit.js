import React from 'react';
import './Assets.scss';

const euro = (
  <span class="euro">&euro;</span>
)

export default function MegaCredit(props) {
  return (
    <div className="mc"><span>{props.children || euro}</span></div>
  );
}
