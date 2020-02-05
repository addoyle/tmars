import React from 'react';
import { castArray } from 'lodash';
import './CardLayout.scss';
import classNames from 'classnames';

/**
 * Base level Card class
 */
export default function CardLayout(props) {
  return (
    <div className={classNames('card', props.type, { landscape: props.landscape, simple: props.simple })}>
      {props.children}
      {props.set ? castArray(props.set).map((set, i) => <div key={i} className={classNames('set', set)} />) : ''}
    </div>
  );
}
