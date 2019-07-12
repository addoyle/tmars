import React, { Component } from 'react';
import './Log.scss';

export default class CardPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      card: null
    }
  }

  componentDidMount() {
    Promise.all([require(`../../../cards/projects/${this.props.card}`)]).then(res => {
      this.setState({ card: res[0].default });
    });
  }

  render() {
    const card = this.state.card ? React.createElement(this.state.card.constructor, this.state.card.props) : (<div>Loading...</div>);

    return (
      <div className={`card-preview ${this.props.show ? 'show' : ''}`}>
        {card}
      </div>
    );
  }
}
