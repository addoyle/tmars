import React from 'react';
import Automated from '../Automated';
import {
  Production,
  MegaCredit,
  Tag,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  'Increase your M€ production 1 step per different tag you have in play, including this.';

export default new Automated({
  number: 'X05',
  title: 'Interplanetary Trade',
  cost: 27,
  tags: ['space'],
  set: 'promo',
  desc,
  flavor: 'Deuterium, diamonds, and delicacies',
  production: (player, game) =>
    game.production(
      player,
      'megacredit',
      Object.entries(player.tags)
        // Event tags don't count as they are not "in play"
        .filter(e => e[0] !== 'event')
        .map(e => e[1])
        .filter(n => n > 0).length
    ),
  vp: 1,
  emoji: '💶',
  layout: (
    <div className="flex gutter">
      <div className="middle text-center">
        <div className="resources">
          <Production>
            <div className="flex">
              <MegaCredit value="1" />
            </div>
          </Production>
          /<Tag name="all" />
        </div>
        <div className="description middle text-center">{desc}</div>
      </div>
      <div className="bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
