import React from 'react';
import Automated from '../../components/Automated';
import MegaCredit from '../../components/assets/MegaCredit';
import Production from '../../components/assets/Production';
import Tag from '../../components/assets/Tag';
import VictoryPoint from '../../components/assets/VictoryPoint';

const desc = 'Increase your M€ production 1 step for each Earth tag you have.';

export default new Automated({
  number: 51,
  title: 'Miranda Resort',
  cost: 12,
  tags: ['jovian', 'space'],
  set: 'corporate',
  desc,
  flavor: 'Situated on Verona Rupes, the highest vertical drop in the solar system, the resort attracts many of the thrill-seekers among the rich on Earth',
  clientAction: game => {},
  serverAction: game => {},
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
