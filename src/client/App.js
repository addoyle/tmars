import React, { Component } from 'react';
import './App.scss';
import Board from './components/board/Board';
// import CardRef from './components/board/CardRef';
import LogModel from './models/log.model';
import BoardModel from './models/board.model';
import { Provider } from 'mobx-react';

/**
 * React entry point
 */
class App extends Component {
  logStore = new LogModel();
  boardStore = new BoardModel();

  constructor(props) {
    super(props);

    // Don't reset scroll on refresh
    history.scrollRestoration = 'manual';

    this.state = {
      cards: []
    };
  }

  componentDidMount() {
    // const files = [];
    // // for (var i = 212; i >= 1; i--) {
    // for (var i = 1; i <= 3; i++) {
    //   const num = i.toString();
    //   files.push('X' + '0'.repeat(2 - num.length) + num);
    // }
    // const promises = [];
    //
    // // files.forEach(file => promises.push(require('../cards/projects/' + file)));
    // files.forEach(file => promises.push(require('../cards/corps/' + file)));
    // Promise.all(promises).then(values => this.setState({ cards: values.map(value => value.default) }));
  }

  render() {
    // return (
    //   <div className="App">
    //     {this.state.cards.map((card, i) => React.createElement(card.constructor, {...card.props, key: i}))}
    //   </div>
    // );
    return (
      <div className="App">
        <Provider logStore={this.logStore} boardStore={this.boardStore}>
          <Board />
        </Provider>
      </div>
    );
  }
}

export default App;
