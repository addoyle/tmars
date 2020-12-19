import React from 'react';
import Active from '../Active';
import {
  Resource,
  VictoryPoint,
  Param
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Add 1 floater to ANY card, or spend 1 floater here to draw a card.';

export default new Active({
  number: '213',
  title: 'Aerial Mappers',
  cost: 11,
  tags: ['venus'],
  set: 'venus',
  activeDesc,
  flavor:
    'Investigating opportunities in wind patterns and atmospheric composition',
  vp: 1,
  emoji: '🌀',
  todo: true,
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span className="arrow" />
        <Resource name="floater" />
        <span>*OR</span>
        <Resource name="floater" />
        <span className="arrow" />
        <Param name="card back" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-4" />
      <div className="col-1">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
