import React, { Component } from 'react';
import { castArray } from 'lodash';
import './Card.scss';

/**
 * Base level Card class
 */
export default class Card extends Component {
  title;
  tags;
  desc;
  flavor;

  // Card set. E.g. base, corporate, venus, colonies, turmoil, promo
  set = 'base';

  constructor(props) {
    super(props);

    Object.assign(this, props);
  }

  render() {
    return (
      <div className={`card ${this.props.type || ''} ${this.props.landscape ? 'landscape' : ''} ${this.props.simple ? 'simple' : ''}`}>
        {this.props.children}
        {this.props.set ? castArray(this.props.set).map(set => <div className={`set ${set}`} />) : ''}
      </div>
    );
  }
}
