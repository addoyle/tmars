import React, { Component } from 'react';
import { castArray } from 'lodash';
import './Card.scss';
import classNames from 'classnames';

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
      <div className={classNames('card', this.props.type, { landscape: this.props.landscape, simple: this.props.simple })}>
        {this.props.children}
        {this.props.set ? castArray(this.props.set).map((set, i) => <div key={i} className={classNames('set', set)} />) : ''}
      </div>
    );
  }
}
