import React, { Component } from 'react';
import './CardPreview.scss'
import classNames from 'classnames';

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

  normalize(num) {
    return isNaN(num) ? num : num.toString().padStart(3, '0');
  }

  /**
   * Loads a card from file
   */
  loadCard() {
    if (this.props.card) {
      Promise.all([require(`../../../cards/${this.props.type}s/${this.normalize(this.props.card)}`)]).then(res => {
        this.setState({ card: res[0].default });
      });
    }
  }

  hideCard() {
    setTimeout(() => this.setState({ card: null }), 1000);
  }

  render() {
    const resources = this.props.resources;

    if (this.props.show && (!this.state.card || (this.props.card && this.normalize(this.state.card.props.number) !== this.normalize(this.props.card)))) {
      this.loadCard();
    }
    if (this.state.card && !this.props.show) {
      this.hideCard();
    }

    const card = this.state.card ? React.createElement(this.state.card.constructor, {...this.state.card.props, resources}) : (<div>Loading...</div>);

    return (
      <div className={classNames('card-preview', { show: this.props.show && this.state.card, simple: this.props.simple })}>
        {card}
      </div>
    );
  }
}

CardPreview.defaultProps = {
  type: 'project',
  show: true
}
