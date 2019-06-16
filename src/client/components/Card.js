import React, { Component } from 'react';
import './Card.scss';

export default class Card extends Component {
  title;
  tags;
  desc;
  flavor;
  set = 'base';

  constructor(props) {
    super(props);

    Object.assign(this, props);
  }

  render() {
    return (
      <div className={`card ${this.props.type} ${this.props.landscape ? 'landscape' : ''}`}>
        {this.props.children}
        {this.props.set ? (<div className={`set ${this.props.set}`} />) : ''}
      </div>
    );
  }
}
