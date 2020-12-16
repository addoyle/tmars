import React from 'react';
import Event from '../Event';
import {
  Tile,
  MegaCredit,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  'Place an ocean tile. IF THERE ARE TILES ADJACENT TO THIS OCEAN TILE, YOU MAY REMOVE 4 M€ FROM THE OWNER OF ONE OF THOSE TILES.';

export default new Event({
  number: 188,
  title: 'Flooding',
  cost: 7,
  tags: ['event'],
  desc,
  flavor: 'Look out for tsunamis',
  action: (player, game, done) =>
    game.promptTile(player, 'ocean', tile => {
      // TODO: take 4 MC from an adjacent player
      console.log(tile);
      done();
    }),
  vp: -1,
  emoji: '🌊',
  todo: true,
  layout: (
    <div className="flex">
      <div className="col-1 middle text-center">
        <div className="resources">
          <Tile name="ocean" />
        </div>
        <div className="resources">
          <div>
            &ndash;
            <MegaCredit value="4" />*
          </div>
        </div>
      </div>
      <div className="col-2 middle">
        <div className="description">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">-1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
