import React from 'react';
import Active from '../Active';
import {
  VictoryPoint,
  Tag,
  Resource
} from '../../../client/game/components/assets/Assets';

// TODO action

const activeDesc =
  'Effect: When you play a Science tag, including this, add 1 animal to this card.';
const desc = 'Requires Venus 18%. 1 VP for each animal on this card.';

export default new Active({
  number: '259',
  title: 'Venusian Animals',
  cost: 15,
  tags: ['venus', 'science', 'animal'],
  set: 'venus',
  restriction: {
    value: 18,
    param: 'venus'
  },
  activeDesc,
  desc,
  flavor: 'Heavy genetic engineering is needed for this work',
  vp: () => this.resources,
  emoji: '🦓',
  todo: true,
  activeLayout: (
    <div className="text-center">
      <div className="resources">
        <Tag name="science" />:
        <Resource name="animal" />
      </div>
      <div className="description">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-4 description middle text-center">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/
            <Resource name="animal" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});
