import React from 'react';
import Active from '../Active';
import {
  VictoryPoint,
  MegaCredit,
  Tag
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Effect: When you play a Venus tag, you pay 2 M€ less for it.';

export default new Active({
  number: 258,
  title: 'Venus Waystation',
  cost: 9,
  tags: ['venus', 'space'],
  set: 'venus',
  activeDesc,
  flavor: 'Connecting the atmospheric shuttles to the interplanetary flights',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '🚏',
  activeLayout: (
    <div className="text-center">
      <div className="resources">
        <Tag name="venus" />:
        <MegaCredit value="-2" />
      </div>
      <div className="description">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-4" />
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
