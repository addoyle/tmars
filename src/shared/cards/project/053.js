import React from 'react';
import Automated from '../Automated';
import {
  Tile,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc = 'Requires 0°C or warmer. Place 2 ocean tiles.';

export default new Automated({
  number: '053',
  title: 'Lake Marineris',
  cost: 18,
  tags: [],
  restriction: {
    value: 0,
    param: 'temperature'
  },
  desc,
  flavor: 'Filling the Valles Marineris takes a lot of water',
  action: (player, game, done) =>
    game.promptTile(player, 'ocean', () =>
      game.promptTile(player, 'ocean', done)
    ),
  vp: 1,
  emoji: '🏊',
  layout: (
    <div className="flex gutter">
      <div className="col-4 middle">
        <div className="center flex">
          <div className="col-1 resources text-center middle">
            <Tile name="ocean" />
            <Tile name="ocean" />
          </div>
        </div>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
