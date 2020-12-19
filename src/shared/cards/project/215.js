import React from 'react';
import Event from '../Event';
import { Param, Resource } from '../../../client/game/components/assets/Assets';

const desc = 'Raise Venus 1 step. Add 3 floaters to ANY VENUS CARD.';

export default new Event({
  number: '215',
  title: 'Air-Scrapping Expedition',
  cost: 13,
  tags: ['venus', 'event'],
  set: 'venus',
  desc,
  flavor:
    'Converting CO\u2082 into nanotube materials that support your hovering infrastructure',
  action: (player, game, done) =>
    game.param(player, 'venus', () => {
      // TODO handle floaters
      done();
    }),
  emoji: '🎈',
  todo: true,
  layout: (
    <div className="flex">
      <div className="col-1 middle">
        <div className="resources">
          <Param name="venus" />
        </div>
        <div className="resources">
          <Resource name="floater" tag="venus" />
          &nbsp;
          <Resource name="floater" tag="venus" />
          &nbsp;
          <Resource name="floater" tag="venus" />
        </div>
      </div>
      <div className="col-1 description middle">{desc}</div>
    </div>
  )
});
