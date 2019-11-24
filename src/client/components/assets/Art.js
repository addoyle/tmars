import React from 'react';
import { Resource } from './Assets';

/**
 * Card art
 *
 * @prop art Art to display on the card
 */
export default function Art(props) {
  return <div className="image">
    {props.art}
    {props.resources ? <div className="resources image-resources">
      <span>{props.resources.value}</span>
      <Resource name={props.resources.type} />
    </div> : null}
  </div>;
}
