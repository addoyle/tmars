import React from 'react';
import Automated from '../Automated';
import {
  VictoryPoint,
  Tile,
  Resource,
  Production
} from '../../../client/game/components/assets/Assets';

const desc =
  'Requires 4 science tags. Decrease your energy production 1 step. Increase your titanium production 1 step. Place a city tile ON THE RESERVED AREA.';

export default new Automated({
  number: 220,
  title: 'Dawn City',
  cost: 15,
  tags: ['space', 'city'],
  set: 'venus',
  restriction: {
    value: 4,
    tag: 'science'
  },
  desc,
  flavor:
    'Rolling around Mercury, always just before sunrise - time seems to stand still',
  action: (player, game, done) => {
    game.production(player, 'power', -1);
    game.production(player, 'titanium', 1);
    game.placeTile(player, game.offMars.dawn, 'city', done);
  },
  canPlay: player => {
    const valid = player.production.power > 0;
    return {
      valid,
      msg: !valid ? 'Not enough power production' : null
    };
  },
  vp: 3,
  emoji: '🌃',
  layout: (
    <div>
      <div className="flex gutter">
        <div className="col-1 middle">
          <Production>
            <div>
              <div className="flex">
                <div className="col-1">&ndash;</div>
                <Resource name="power" />
              </div>
              <div className="flex">
                <div className="col-1">+</div>
                <Resource name="titanium" />
              </div>
            </div>
          </Production>
        </div>
        <div className="col-3 description middle">{desc}</div>
      </div>
      <div className="flex">
        <div className="col-3">
          <div className="resources">
            <Tile name="city" asterisk />
          </div>
        </div>
        <div className="col-1 bottom text-right">
          <VictoryPoint>
            <span className="big point">3</span>
          </VictoryPoint>
        </div>
      </div>
    </div>
  )
});
