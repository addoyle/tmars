import React from 'react';
import './Assets.scss';
import Tag from './Tag';

export default function Param(props) {
  return (
    <div className={`param ${props.name}`}>
      {props.tag ? (
        <Tag name={props.tag} />
      ) : ''}
    </div>
  );
}
