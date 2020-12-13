import React from 'react';
import Active from '../Active';
import {
  VictoryPoint,
  Tag,
  MegaCredit
} from '../../../client/game/components/assets/Assets';

// TODO ACTION

const activeDesc =
  'Effect: When you play a space card, you pay 2 M€ less for it.';

export default new Active({
  number: 25,
  title: 'Space Station',
  cost: 10,
  tags: ['space'],
  set: 'corporate',
  activeDesc,
  flavor: 'Buy it today at www.fryxgames.se',
  vp: 1,
  emoji: '🛰',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Tag name="space" />:
        <MegaCredit value="-2" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-4"></div>
      <div className="col-1">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
