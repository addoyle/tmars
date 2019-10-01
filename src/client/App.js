import React, { Component } from 'react';
import './App.scss';
import Board from './components/board/Board';
import CardRef from './components/board/CardRef';

/**
 * React entry point
 */
class App extends Component {
  constructor(props) {
    super(props);

    // Don't reset scroll on refresh
    history.scrollRestoration = 'manual';

    this.state = {
      cards: [],
      log: [
        { name: 'Andy', player: 1, body: 'this is cool' },
        { name: 'Andy', player: 1, body: (<span> played <CardRef projectType="automated" card="032">Underground City</CardRef>.</span>), system: true },
        { name: 'Andy', player: 1, body: (<span> placed a <span className="strong">City</span>.</span>), system: true },
        { name: 'Adrian', player: 5, body: (<span>'s <CardRef projectType="active" card="038">Rover Construction</CardRef> effect was activated.</span>), system: true },//'
        { name: 'Andy', player: 1, body: (<span> bought a <span className="strong">City</span> standard project.</span>), system: true },
        { name: 'Andy', player: 1, body: (<span> placed a <span className="strong">City</span>.</span>), system: true },
        { name: 'Adrian', player: 5, body: (<span>'s <CardRef projectType="active" card="038">Rover Construction</CardRef> effect was activated.</span>), system: true },//'
        { name: 'Colin', player: 3, body: 'andy you suck at this game' },
        { name: 'Frank', player: 2, body: (<span> claimed the <span className="strong">Builder</span> milestone.</span>), system: true },
        { name: 'Frank', player: 2, body: (<span> skipped.</span>), system: true },
        { name: 'Colin', player: 3, body: (<span> passed.</span>), system: true },
        { name: 'Larissa', player: 4, body: (<span> funded the <span className="strong">Banker</span> award.</span>), system: true },
        { name: 'Larissa', player: 4, body: (<span> converted heat to <span className="strong">raise temperature</span>.</span>), system: true },
        { name: 'Frank', player: 2, body: 'suck it colin' },
        { name: 'Adrian', player: 5, body: 'colin is a sucktion cup' },
        { name: 'Frank', player: 2, body: 'stfu adrian and play your turn' },
        { name: 'Adrian', player: 5, body: (<span> converted plants to a <span className="strong">greenery</span>.</span>), system: true },
        { name: 'Adrian', player: 5, body: (<span> placed a <span className="strong">Greenery</span>.</span>), system: true },
        { name: 'Adrian', player: 5, body: (<span> used an action on <CardRef projectType="active" card="033">Regolith Eaters</CardRef> to add one <span className="strong">microbe</span> to this card.</span>), system: true },
        { name: 'Andy', player: 1, body: (<span> played <CardRef projectType="automated" card="018">Methane From Titan</CardRef>.</span>), system: true },
        { name: 'Andy', player: 1, body: (<span> played <CardRef projectType="event" card="039">Deimos Down</CardRef>.</span>), system: true },
        { name: 'Andy', player: 1, body: (<span> took <span className="strong">8</span> plants from <span className="strong player-2">Frank</span>!.</span>), system: true },
        { name: 'Frank', player: 2, body: 'it\s fine. idgaf' }
      ]
    };
  }

  componentDidMount() {
    const files = [];
    for (var i = 194; i >= 1; i--) {
    // for (var i = 0; i <= 15; i++) {
      const num = i.toString();
      files.push('0'.repeat(3 - num.length) + num);
    }
    const promises = [];

    files.forEach(file => promises.push(require('../cards/projects/' + file)));
    // files.forEach(file => promises.push(require('../cards/corps/' + file)));
    Promise.all(promises).then(values => this.setState({ cards: values.map(value => value.default) }));
  }

  render() {
    return (
      <div className="App">
        {this.state.cards.map((card, i) => React.createElement(card.constructor, {...card.props, key: i}))}
      </div>
    );
    // return (
    //   <div className="App">
    //     <Board log={this.state.log} />
    //   </div>
    // );
  }
}

export default App;
