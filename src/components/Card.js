import React, { Component } from 'react';
import Project from './Project';
import CardLayout from './assets/CardLayout';

export default class Card extends Component {
  render() {
    const card = this.props.card;

    if (card.type === 'automated' || card.type === 'active' || card.type === 'event') {
      return (
        <Project {...card} top={card.type === 'active' && (<CardLayout card={{number: `${card.number}_top`}} />)}>
          <CardLayout card={card} />
        </Project>
      );
    }
  }
}
