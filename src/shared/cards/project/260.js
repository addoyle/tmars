import React from 'react';
import Active from '../Active';
import {
  VictoryPoint,
  Resource
} from '../../../client/game/components/assets/Assets';

const activeDesc = 'Action: Add 1 microbe to this card.';
const desc = 'Requires Venus 12%. 1 VP per 2 microbes on this card.';

// TODO action

export default new Active({
  number: 260,
  title: 'Venusian Insects',
  cost: 5,
  tags: ['venus', 'microbe'],
  set: 'venus',
  restriction: {
    value: 12,
    param: 'venus'
  },
  activeDesc,
  desc,
  flavor:
    'With engineered chitin carapace to withstand the corrosive environment',
  vp: () => Math.floor(this.resources / 2),
  emoji: '🐞',
  todo: true,
  activeLayout: (
    <div className="text-center">
      <div className="resources">
        <span className="arrow" />
        <Resource name="microbe" />
      </div>
      <div className="description">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-4 description middle">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/2
            <Resource name="microbe" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});
