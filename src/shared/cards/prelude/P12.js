import React from 'react';
import Prelude from '../Prelude';
import { Param, Tile } from '../../../client/game/components/assets/Assets';

const desc =
  'Place a greenery tile and increase oxygen 1 step. Reveal cards from the deck until you have revealed 2 plant-tag cards. Take these into your hand, and discard the rest.';

export default new Prelude({
  number: 'P12',
  title: 'Experimental Forest',
  tags: ['plant'],
  set: 'prelude',
  desc,
  flavor:
    'Nothing spurs new ecological advances like having a biological testing ground',
  emoji: '🌳',
  action: (player, game, done) => {
    game.revealCards(
      player,
      card => card.tags.includes('plant'),
      2,
      'plant cards',
      { tag: 'plant' }
    );
    game.promptTile('greenery', player, done);
  },
  layout: (
    <div className="flex gutter m-bottom">
      <div className="col-1 middle">
        <div className="resources">
          <Tile name="greenery" />
          <Param name="card back" tag="plant" />
          <Param name="card back" tag="plant" />
        </div>
      </div>
      <div className="col-2 middle description">{desc}</div>
    </div>
  )
});
