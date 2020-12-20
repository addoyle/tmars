import React from 'react';
import Active from '../Active';
import {
  Resource,
  Production,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

// TODO ACTION

const activeDesc = 'Action: Add 1 animal to this card.';
const desc =
  'Requires +2°C or warmer. Decrease any plant production 1 step. 1 VP for each animal on this card.';

const card = new Active({
  number: '052',
  title: 'Fish',
  cost: 9,
  tags: ['animal'],
  restriction: {
    value: 2,
    param: 'temperature'
  },
  activeDesc,
  desc,
  resource: 'animal',
  flavor: 'Martian barracudas? Why not!',
  action: (player, game, done) => {
    game.promptPlayer(
      player,
      { production: 'plant' },
      ['took 1 plant ', { resource: 'plant' }, ' production from'],
      targetPlayer => {
        game.production(targetPlayer, 'plant', -1);
        done();
      }
    );
  },
  canPlay: (player, game) => {
    const valid = !!game.players.filter(player => player.production.plant > 0)
      .length;
    return {
      valid,
      msg: !valid ? 'Requires at least one player with plant production' : null
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
  emoji: '🐟',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span className="arrow" />
        <Resource name="animal" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <Production>
          <div className="flex">
            <div>&ndash;</div>
            <Resource name="plant" anyone />
          </div>
        </Production>
      </div>
      <div className="col-3 middle description">{desc}</div>
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
