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
    Promise.all([require(`../../../cards/${this.props.type}s/${this.props.card}`)]).then(res => {
      this.setState({ card: res[0].default });
    });
  }

  hideCard() {
    setTimeout(() => this.setState({ card: null }), 1000);
  }

  render() {
    if (!this.state.card && this.props.show) {
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
  type: 'project'
}
