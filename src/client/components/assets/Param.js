import React from 'react';
import './Assets.scss';
import Tag from './Tag';

/**
 * TR parameter
 *
 * @prop name Param type (e.g. temperature, oxygen, card)
 * @prop tag  Tag of parameter (typically only used for name='card')
 */
export default function Param(props) {
  return (
    <div className={`param ${props.name}`}>
      {props.tag ? (
        <Tag name={props.tag} />
      ) : ''}
    </div>
  );
}
