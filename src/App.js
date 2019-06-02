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
    const files = ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010', '011', '012', '013', '014', '015', '016', '017', '018', '019', '020'];
    const promises = [];

    files.forEach(file => promises.push(import('./cards/projects/' + file)));
    Promise.all(promises).then(values => this.setState({ cards: values.map(value => value.default) }));
  }


  // return React.createElement(card.constructor, card);
  render() {
    return (
      <div className="App">
        {this.state.cards.map((card, i) => React.createElement(card.constructor, card.props))}
      </div>
    );
  }
}

export default App;
