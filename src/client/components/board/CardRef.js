import React, { Component } from 'react';
import './CardRef.scss';
import CardPreview from './CardPreview';
import HoverIntent from '../../util/HoverIntent';
import classNames from 'classnames';

/**
 * Shows a card popup on hover
 */
export default class CardRef extends Component {
  constructor(props) {
    super(props);
    
    this.state = { shown: false };

    this.card = require(`../../../cards/${this.props.type}s/${this.normalize(this.props.card)}`).default;
  }

  normalize(num) {
    return isNaN(num) ? num : num.toString().padStart(3, '0');
  }

  onMouseOver() {
    this.setState({ shown: true });
  }

  onMouseOut() {
    this.setState({ shown: false });
  }

  render() {
    return (
      <HoverIntent timeout={300} onMouseOver={this.onMouseOver.bind(this)} onMouseOut={this.onMouseOut.bind(this)}>
        <span className={classNames('card-ref', this.card.constructor.name.toLowerCase())} ref="ref">
          {this.card.title}
          <CardPreview card={this.props.card} show={this.state.shown} type={this.props.type} ref="preview" />
        </span>
      </HoverIntent>
    );
  }
}
