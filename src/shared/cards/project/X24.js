import React from 'react';
import Automated from '../Automated';
import {
  Tile,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  'Place a city tile IN SPACE, outside and separate from the planet.';

export default new Automated({
  number: 'X24',
  title: 'Magnetic Shield',
  cost: 24,
  tags: ['space'],
  set: 'promo',
  restriction: {
    value: 3,
    tag: 'power'
  },
  desc,
  flavor:
    'A world of its own inside a giant space wheel, slowly rotating to create artificial gravity',
  action: (player, game, done) =>
    game.placeTile(player, game.offMars.torus, 'city', done),
  vp: 2,
  emoji: '🍩',
  layout: (
    <div className="flex">
      <div className="col-1 middle">
        <div className="resources">
          <Tile name="city" asterisk />
        </div>
      </div>
      <div className="col-2 description middle">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">2</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
