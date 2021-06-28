import React from 'react';
import Active from '../Active';
import {
  MegaCredit,
  VictoryPoint,
  Param
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Effect: When playing a card with a requirement, you pay 2 M€ less.';

const card = new Active({
  number: 'X18',
  title: 'Cutting Edge Technology',
  cost: 12,
  tags: ['science'],
  set: 'promo',
  activeDesc,
  flavor:
    'We choose to go to the Moon in this decade and do the other things, not because they are easy, but because they are hard.’ - JFK',
  action: player =>
    (player.rates.cost.requirement = (player.rates.cost.requirement || 0) - 2),
  vp: 1,
  emoji: '🧬',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Param name="card back" requirement />
        <span>&nbsp;&nbsp;&nbsp;:</span>
        <MegaCredit value="-2" />
      </div>
      <div className="description text-center">{activeDesc}</div>
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

export default card;
