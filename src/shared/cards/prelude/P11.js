import React from 'react';
import Prelude from '../Prelude';

const desc = 'PLAY A CARD FROM HAND, REDUCING ITS COST BY 25 M€';

export default new Prelude({
  number: 'P11',
  title: 'Excentric Sponsor',
  tags: [],
  set: 'prelude',
  desc,
  flavor: 'He’ll support you, but he wants something big with his name on it',
  emoji: '🧐',
  todo: true,
  action: (player, game, done) => {
    // Reduce cost of card by 25
    player.rates.cost.all = (player.rates.cost.all || 0) - 25;
    game.promptCard(player, player => {
      // Set cost modifier back
      player.rates.cost.all += 25;
      done();
    });
  },
  layout: (
    <div className="flex m-top m-bottom">
      <div className="col-1" />
      <div className="col-3 text-center">{desc}</div>
      <div className="col-1" />
    </div>
  )
});
