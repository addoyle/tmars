import React from 'react';
import Active from '../Active';
import { Tag, MegaCredit, Production, Resource, VictoryPoint } from '../../client/components/assets/Assets';

const activeDesc = 'Effect: When you play a space card, you pay 2 M€ less for it.';
const desc = 'Requires 5% oxygen. Decrease your energy production 1 step and increase your M€ production 2 steps.';

export default new Active({
  number: 166,
  title: 'Shuttles',
  cost: 10,
  tags: ['space'],
  restriction: {
    value: 5,
    param: 'oxygen'
  },
  activeDesc,
  desc,
  flavor: 'Aided by low gravity going up, and by the increasing atmosphere when gliding down for landing',
  clientAction: game => {},
  serverAction: game => {},
  vp: 1,
  emoji: '🛩',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Tag name="space" />:<MegaCredit value="-2" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-1">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="power" />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <MegaCredit value="2" />
          </div>
        </Production>
      </div>
      <div className="col-2 description middle">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
