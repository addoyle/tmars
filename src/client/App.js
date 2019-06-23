import React, { Component } from 'react';
import './App.scss';
// import cards from './cards/base.js';
// import card from './cards/base/projects/001.js';
import Board from './components/board/Board';

// {Object.keys(cards).map((card, i) => (<Card key={i} card={cards[card]} />))}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { cards: [] };
  }

  componentDidMount() {
    // const files = [];
    // // for (var i = 1; i <= 52; i++) {
    // for (var i = 0; i <= 15; i++) {
    //   const num = i.toString();
    //   files.push('0'.repeat(3 - num.length) + num);
    // }
    // const promises = [];
    //
    // // files.forEach(file => promises.push(require('../cards/projects/' + file)));
    // files.forEach(file => promises.push(require('../cards/corps/' + file)));
    // Promise.all(promises).then(values => this.setState({ cards: values.map(value => value.default) }));
  }


  // return React.createElement(card.constructor, card);
  //{this.state.cards.map((card, i) => React.createElement(card.constructor, {...card.props, key: i}))}
  render() {
    return (
      <div className="App">
        <Board />
      </div>
    );
  }
}

export default App;
