import React from 'react';
import Automated from '../Automated';
import {
  Production,
  MegaCredit,
  Tag
} from '../../../client/game/components/assets/Assets';

const desc =
  'Increase your M€ production 1 step for each Earth tag you have, including this.';

export default new Automated({
  number: 137,
  title: 'Cartel',
  cost: 8,
  tags: ['earth'],
  set: 'corporate',
  desc,
  flavor: 'We see it as brotherhood',
  action: (player, game) =>
    game.production(player, 'megacredit', player.tags.earth),
  emoji: '👨‍👨‍👦‍👦',
  layout: (
    <div className="text-center">
      <Production>
        <div className="flex">
          <MegaCredit value="1" />
          <div>/</div>
          <Tag name="earth" />
        </div>
      </Production>
      <div className="description m-bottom">{desc}</div>
    </div>
  )
});
