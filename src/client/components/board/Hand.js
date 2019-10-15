import React, { Component } from 'react';
import './Hand.scss';
import { Param } from '../assets/Assets';
import CardPreview from './CardPreview';

/**
 * Standard Projects pane
 */
export default class Hand extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: true,
      cards: Array.from({length: 10}, () => Math.floor(Math.random() * 212) + 1)
    };

    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  toggleCollapse() {
    this.setState({collapse: !this.state.collapse});
  }

  render() {
    return (
      <div className={`hand ${this.state.collapse ? 'collapse' : ''}`} onMouseDown={e => e.stopPropagation()} onMouseMove={e => e.stopPropagation()}>
        <button className="hand-btn" onClick={this.toggleCollapse}>
          <Param name="card back" />
          <Param name="card back" />
          <Param name="card back" />
          <span>Hand</span>
        </button>

        <ul className="cards">
          {this.state.cards.map(card => (
            <li>
              <CardPreview card={card} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
