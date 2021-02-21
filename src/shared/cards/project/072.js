import React from 'react';
import Active from '../Active';
import {
  Resource,
  Production,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const activeDesc = 'Action: Add an animal to this card.';
const desc =
  'Requires 13% oxygen. Decrease any plant production 2 steps. 1 VP for each animal on this card.';

const card = new Active({
  number: '072',
  title: 'Birds',
  cost: 10,
  tags: ['animal'],
  restriction: {
    value: 13,
    param: 'oxygen'
  },
  activeDesc,
  desc,
  resource: 'animal',
  flavor: 'Bringing life to the skies',
  action: (player, game, done) => {
    game.promptPlayer(
      player,
      'Pick a player to remove 2 plant production',
      [p => ({ production: 'plant', value: p.production.plant })],
      ['took 2 plant production ', { production: 'plant' }, ' from'],
      targetPlayer => {
        game.production(targetPlayer, 'plant', -2);
        done();
      },
      player => player.production.plant >= 2
    );
  },
  canPlay: (player, game) => {
    const valid = !!game.players.filter(player => player.production.plant > 1)
      .length;
    return {
      valid,
      msg: !valid
        ? 'Requires at least one player with 2 plant production'
        : null
    };
  },
  actions: [
    {
      name: 'Add 1 Animal',
      log: ['add an animal ', { resource: 'animal' }],
      icon: <Resource name="animal" />,
      action: (player, game) => game.cardResource(player, card, 1)
    }
  ],
  vp: (player, game) => game.cardResource(player, card),
  emoji: '🐦',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span className="arrow" />
        <Resource name="animal" />
      </div>
      <div className="description text-center m-top">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-2 text-center">
        <Production>
          <div className="flex">
            <div>&ndash;</div>
            <Resource name="plant" anyone />
            <Resource name="plant" anyone />
          </div>
        </Production>
        <div className="middle description">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/<Resource name="animal" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});

export default card;
