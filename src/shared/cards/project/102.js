import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource,
  Tag
} from '../../../client/game/components/assets/Assets';

const desc =
  'Increase your energy production 1 step for each power tag you have, including this.';

export default new Automated({
  number: '102',
  title: 'Power Grid',
  cost: 18,
  tags: ['power'],
  desc,
  flavor: 'Making efficient use of your energy production',
  production: (player, game) =>
    game.production(player, 'power', player.tags.power),
  emoji: '🔌',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <div>
              <Resource name="power" />
              /
              <Tag name="power" />
            </div>
          </div>
        </Production>
      </div>
      <div className="col-1 middle description">{desc}</div>
    </div>
  )
});
