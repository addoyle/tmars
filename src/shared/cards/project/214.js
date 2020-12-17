import React from 'react';
import Event from '../Event';
import {
  Tile,
  MegaCredit,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

// TODO handle floater restriction

const desc =
  'Requires that you have 5 floaters. Gain 1 M€ for each city tile in play.';

export default new Event({
  number: 214,
  title: 'Aerosport Tournament',
  cost: 7,
  tags: ['event'],
  set: 'venus',
  restriction: {
    value: 5,
    resource: 'floater'
  },
  desc,
  flavor: 'A spectacular sports event',
  action: (player, game) =>
    game.resources(
      player,
      'megacredit',
      game.field.flat().concat(Object.values(game.offMars)).length
    ),
  vp: 1,
  emoji: '🏂',
  todo: true,
  layout: (
    <div className="flex">
      <div className="col-3 text-center">
        <div className="resources">
          <MegaCredit value="1" />
          <span>/</span>
          <Tile name="city" anyone />
        </div>
        <div className="col-1 description middle">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
