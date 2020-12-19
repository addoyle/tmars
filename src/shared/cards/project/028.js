import React from 'react';
import Active from '../Active';
import {
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Spend 1 titanium to add 1 fighter resource to this card.';
const desc = '1 VP for each fighter resource on this card.';

const card = new Active({
  number: '028',
  title: 'Security Fleet',
  cost: 12,
  tags: ['space'],
  set: 'corporate',
  activeDesc,
  resource: 'fighter',
  desc,
  flavor: 'Keeping the peace by force',
  actions: [
    {
      name: 'Spend 1 Titanium',
      log: ['add a fighter ', { resource: 'fighter' }],
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
      }
    }
  ],
  vp: (player, game) => game.cardResource(player, card),
  emoji: '🚀',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Resource name="titanium" />
        <span className="arrow" />
        <Resource name="fighter" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-4 description text-center middle">{desc}</div>
      <div className="col-1">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/<Resource name="fighter" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});

export default card;
