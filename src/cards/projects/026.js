import React from 'react';
import Automated from '../../components/Automated';
import VictoryPoint from '../../components/assets/VictoryPoint';
import Resource from '../../components/assets/Resource';
import MegaCredit from '../../components/assets/MegaCredit';
import Production from '../../components/assets/Production';

const desc = 'Requires -12°C or warmer. Add 1 animal TO ANY ANIMAL CARD. Gain 3 plants. Increase your M€ production 2 steps.';

export default new Automated({
  number: 26,
  title: 'Eos Chasma National Park',
  cost: 16,
  tags: ['plant', 'building'],
  restriction: {
    value: -12,
    param: 'temperature'
  },
  desc,
  flavor: 'A wonder of the world, doing wonders for the tourism business',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🏞',
  layout: (
    <div>
      <div className="resources">
        <Resource name="animal" />*
        <Resource name="plant" />
        <Resource name="plant" />
        <Resource name="plant" />
      </div>
      <div className="flex gutter">
        <div className="col-1">
          <Production>
            <div className="flex"><MegaCredit value="2" /></div>
          </Production>
        </div>
        <div className="col-3 description middle">{desc}</div>
        <div className="col-1 bottom">
          <VictoryPoint>
            <span className="big point">1</span>
          </VictoryPoint>
        </div>
      </div>
    </div>
  )
});
