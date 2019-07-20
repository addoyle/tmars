import React, { Component } from 'react';
import './CardRef.scss';
import CardPreview from './CardPreview';
import HoverIntent from '../util/HoverIntent';

export default class CardRef extends Component {
  constructor(props) {
    super(props);

    this.state = { shown: false };
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
        <span className={`card-ref ${this.props.projectType || ''}`} ref="ref">
          {this.props.children}
          <CardPreview card={this.props.card} show={this.state.shown} type={this.props.type} ref="preview" />
        </span>
      </HoverIntent>
    );
  }
}
