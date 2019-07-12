import React, { Component } from 'react';
import './Board.scss';
import HoverIntent from '../util/HoverIntent';

export default class CardRef extends Component {
  constructor(props) {
    super(props);

    this.state = { hover: false };
  }

  onMouseOver() {
    if (!this.state.card) {
      
      this.setState({ hover: true });
    }
  }

  onMouseOut() {
    this.setState({ hover: false });
  }

  render() {
    return (
      <HoverIntent timeout={300} onMouseOver={this.onMouseOver.bind(this)} onMouseOut={this.onMouseOut.bind(this)}>
        <span className={`card-ref ${this.props.type}`}>
          {this.props.children}
        </span>
      </HoverIntent>
    );
  }
}
