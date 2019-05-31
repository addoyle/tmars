import React, { Component } from 'react';
import './App.scss';
// import cards from './cards/base.js';
// import card from './cards/base/projects/001.js';

// {Object.keys(cards).map((card, i) => (<Card key={i} card={cards[card]} />))}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { cards: [] };
  }

  componentDidMount() {
    const files = ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010', '011', '012'];

    files.forEach(file => {
      import('./cards/base/projects/' + file).then(m => this.setState({ cards: this.state.cards.concat(m.default) }));
    });
  }


  // return React.createElement(card.constructor, card);
  render() {
    return (
      <div className="App">
        {this.state.cards.map((card, i) => React.createElement(card.constructor, card))}
      </div>
    );
  }
}

export default App;
