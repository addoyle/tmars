import React from 'react';
import Event from '../Event';
import {
  Param,
  MegaCredit
} from '../../../client/game/components/assets/Assets';

const desc =
  'Raise Venus 1 step. Remove up to 4 M€ from a player WITH A VENUS TAG IN PLAY.';

export default new Event({
  number: '218',
  title: 'Comet For Venus',
  cost: 11,
  tags: ['space', 'event'],
  set: 'venus',
  desc,
  flavor: 'Directing it to an almost safe place',
  action: (player, game, done) =>
    game.param(player, 'venus', () =>
      game.promptPlayer(
        player,
        { resources: 'megacredit' },
        ['took 4 M€ ', { megacredit: null }, ' from'],
        targetPlayer => {
          targetPlayer && game.resources(targetPlayer, 'megacredit', -4);
          done();
        },
        p => p.tags.venus > 0
      )
    ),
  emoji: '☄',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <div className="resources">
          <Param name="venus" />
        </div>
        <div className="resources">
          &ndash;
          <MegaCredit anyone value="4" tag="venus" />
        </div>
      </div>
      <div className="col-2 description middle">{desc}</div>
    </div>
  )
});
