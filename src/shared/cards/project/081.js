import React from 'react';
import Automated from '../Automated';
import {
  Tag,
  Tile,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  'Place a city tile ON THE RESERVED AREA. 1 VP per Jovian tag you have.';

export default new Automated({
  number: '081',
  title: 'Ganymede Colony',
  cost: 20,
  tags: ['jovian', 'space', 'city'],
  desc,
  flavor: 'Settling the biggest moon of the biggest planet',
  action: (player, game, done) =>
    game.placeTile(player, game.offMars.ganymede, 'city', done),
  emoji: '🌑',
  vp: player => player.tags.jovian,
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <div className="resources">
          <Tile name="city" asterisk />
        </div>
      </div>
      <div className="col-3">
        <div className="description m-top">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/<Tag name="jovian" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});
