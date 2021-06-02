import React from 'react';
import Active from '../Active';
import { Resource } from '../../../client/game/components/assets/Assets';

// TODO action

const activeDesc = 'Action: Spend 5 heat to gain 3 steel.';

const card = new Active({
  number: 'X26',
  title: 'Meltworks',
  cost: 4,
  tags: ['building'],
  set: 'promo',
  activeDesc,
  flavor: 'Melting ores and recycled materials for new uses',
  actions: [
    {
      name: 'Spend 5 heat',
      icon: (
        <>
          <span>5</span>
          <Resource name="heat" />
        </>
      ),
      canPlay: player => {
        const valid = player.resources.heat >= 5;
        return {
          valid,
          msg: !valid ? 'Not enough heat' : null
        };
      },
      action: (player, game) => {
        game.resources(player, 'heat', -5);
        game.resources(player, 'steel', 3);
      }
    }
  ],
  emoji: '🔥',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span>5</span>
        <Resource name="heat" />
        <span className="arrow" />
        <Resource name="steel" />
        <Resource name="steel" />
        <Resource name="steel" />
      </div>
      <div className="description text-center m-top">{activeDesc}</div>
    </div>
  ),
  layout: <div />
});

export default card;
