import React from 'react';
import Automated from '../Automated';
import {
  MegaCredit,
  Production,
  Tag,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc = 'Increase your M€ production 1 step for each Earth tag you have.';

export default new Automated({
  number: '051',
  title: 'Miranda Resort',
  cost: 12,
  tags: ['jovian', 'space'],
  set: 'corporate',
  desc,
  flavor:
    'Situated on Verona Rupes, the highest vertical drop in the solar system, the resort attracts many of the thrill-seekers among the rich on Earth',
  production: (player, game) =>
    game.production(player, 'megacredit', player.tags.earth),
  vp: 1,
  emoji: '🧗',
  layout: (
    <div className="flex gutter">
      <div className="col-1">
        <Production>
          <div className="flex">
            <MegaCredit value="1" />
            <div>/</div>
            <Tag name="earth" />
          </div>
        </Production>
      </div>
      <div className="col-1 description">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
