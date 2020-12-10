import React from 'react';
import Automated from '../Automated';
import {
  Tile,
  Param,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc = 'Place this tile and raise temperature 2 steps.';

export default new Automated({
  number: 97,
  title: 'Nuclear Zone',
  cost: 10,
  tags: ['earth'],
  desc,
  flavor:
    'Detonating obsolete nuclear weapons from Earth is an efficient method for raising the temperature',
  action: (player, game, done) => {
    game.param(player, 'temperature');
    game.param(player, 'temperature');
    game.promptTile(player, { special: 'nuclear' }, done);
  },
  canPlay: (player, game) => {
    const valid = !!game.findPossibleTiles({ special: 'nuclear' }, player)
      .length;

    return {
      valid,
      msg: !valid ? 'Cannot place this tile' : null
    };
  },
  vp: -2,
  emoji: '☢',
  layout: (
    <div className="flex gutter">
      <div className="col-3 text-center">
        <div className="resources">
          <Tile name="special" icon="nuclear" />
          <Param name="temperature" />
          <Param name="temperature" />
        </div>
        <div className="description">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">-2</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
