import React, { Component } from 'react';
import './CardPreview.scss'

/**
 * Displays a card as a popup
 */
export default class CardPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      card: null
    }
  }

  /**
   * Loads a card from file
   */
  loadCard() {
    let card = this.props.card;
    if (!isNaN(card)) {
      card = card.toString().padStart(3, '0');
    }

    if (this.props.card) {
      Promise.all([require(`../../../cards/${this.props.type}s/${card}`)]).then(res => {
        this.setState({ card: res[0].default });
      });
    }
  }

  hideCard() {
    setTimeout(() => this.setState({ card: null }), 1000);
  }

  render() {
    if (this.props.show && (!this.state.card || (this.props.card && this.state.card.props.number !== this.props.card))) {
      this.loadCard();
    }
    if (this.state.card && !this.props.show) {
      this.hideCard();
    }

    const card = this.state.card ? React.createElement(this.state.card.constructor, this.state.card.props) : (<div>Loading...</div>);

    return (
      <div className={`card-preview ${this.props.show && this.state.card ? 'show' : ''}`}>
        {card}
      </div>
    );
  }
}

CardPreview.defaultProps = {
  type: 'project',
  show: true
}
