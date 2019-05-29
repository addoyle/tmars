import React from 'react';
import Card from './components/Card';
import './App.scss';
import cards from './cards/base.js';

function App() {
  return (
    <div className="App">
      {Object.keys(cards).map((card, i) => (<Card key={i} card={cards[card]} />))}
    </div>
  );
}

export default App;
