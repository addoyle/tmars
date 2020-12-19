import React from 'react';
import Automated from '../Automated';
import {
  Resource,
  Production,
  Tile
} from '../../../client/game/components/assets/Assets';

const desc =
  'Place a city tile. Decrease your energy production 2 steps and increase your steel production 2 steps.';

export default new Automated({
  number: '032',
  title: 'Underground City',
  cost: 18,
  tags: ['city', 'building'],
  desc,
  flavor:
    'Excavating is expensive, but given both protection and building materials',
  action: (player, game, done) => {
    game.production(player, 'power', -2);
    game.production(player, 'steel', 2);
    game.promptTile(player, 'city', done);
  },
  canPlay: (player, game) => {
    if (player.production.power < 2) {
      return {
        valid: false,
        msg: 'Not enough power production'
      };
    }

    const valid = !!game.findPossibleTiles('city', player).length;
    return {
      valid,
      msg: !valid ? 'Cannot place city tile' : null
    };
  },
  emoji: '🚇',
  layout: (
    <div className="flex">
      <div className="col-2 middle">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="power" />
            <Resource name="power" />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <Resource name="steel" />
            <Resource name="steel" />
          </div>
        </Production>
      </div>
      <div className="col-3 middle">
        <div className="resources">
          <Tile name="city" />
        </div>
        <div className="description">{desc}</div>
      </div>
    </div>
  )
});
