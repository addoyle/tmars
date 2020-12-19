import React from 'react';
import Automated from '../Automated';
import {
  Production,
  MegaCredit,
  Tag
} from '../../../client/game/components/assets/Assets';

const desc =
  'Increase your M€ production 1 step for each space tag your OPPONENTS have.';

export default new Automated({
  number: '099',
  title: 'Toll Station',
  cost: 12,
  tags: ['space'],
  set: 'corporate',
  desc,
  flavor: 'Licensed by the ‘government’',
  action: (player, game) =>
    game.production(
      player,
      'megacredit',
      game.players
        .filter(p => p.number !== player.number)
        .reduce((sum, p) => (sum += p.tags.space), 0)
    ),
  emoji: '💶',
  layout: (
    <div className="m-bottom">
      <div className="flex gutter center">
        <Production>
          <div className="flex">
            <div>
              <MegaCredit value="1" />
              <span>/</span>
              <Tag name="space" anyone />
              <span>*</span>
            </div>
          </div>
        </Production>
      </div>
      <div className="description text-center m-top">{desc}</div>
    </div>
  )
});
