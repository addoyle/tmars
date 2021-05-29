import React from 'react';
import Active from '../Active';
import {
  Resource,
  MegaCredit,
  VictoryPoint,
  Production
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Spend 1 titanium to add 1 asteroid resource here and increase 1 M€ production 1 step.';
const desc = '1 VP per 2 asteroids on this card.';

const card = new Active({
  number: 'X15',
  title: 'Asteroid Hollowing',
  cost: 16,
  tags: ['space'],
  set: 'promo',
  activeDesc,
  desc,
  resource: 'asteroid',
  flavor:
    'Creating colonies by settling the interior of asteroids and spinning them up for artificial gravity',
  actions: [
    {
      name: 'Spend 1 Titanium',
      icon: <Resource name="titanium" />,
      canPlay: player => {
        const valid = player.resources.titanium >= 1;
        return {
          valid,
          msg: 'Not enough titanium'
        };
      },
      action: (player, game) => {
        game.resources(player, 'titanium', -1);
        game.cardResource(player, card, 1);
        game.production(player, 'megacredit', 1);
      }
    }
  ],
  vp: 1,
  emoji: '🌑',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Resource name="titanium" />
        <span className="arrow" />
        <Resource name="asteroid" />
        <Production>
          <div className="flex">
            <MegaCredit value="1" />
          </div>
        </Production>
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-4 description middle text-center">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/2
            <Resource name="asteroid" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});

export default card;
