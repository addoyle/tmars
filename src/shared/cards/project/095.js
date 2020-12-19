import React from 'react';
import Active from '../Active';
import {
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Spend 6 energy to add a science resource to this card.';
const desc = '2 VP for each science resource on this card.';

const card = new Active({
  number: '095',
  title: 'Physics Complex',
  cost: 12,
  tags: ['science', 'building'],
  set: 'corporate',
  activeDesc,
  desc,
  resource: 'science',
  flavor:
    'This used to cause blackouts before the invention of supercapacitors',
  actions: [
    {
      name: 'Spend 6 Energy',
      icon: (
        <>
          <span>6</span>
          <Resource name="power" />
        </>
      ),
      canPlay: player => {
        const valid = player.resources.power >= 6;
        return {
          valid,
          msg: 'Not enough energy'
        };
      },
      action: (player, game) => {
        game.resources(player, 'power', -6);
        game.cardResource(player, card, 1);
      }
    }
  ],
  vp: (player, game) => game.cardResource(player, card) * 2,
  emoji: '⚛️',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span>6</span>
        <Resource name="power" />
        <span className="arrow" />
        <Resource name="science" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-3 middle text-center description">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span>
            <span className="point">2</span>/
            <Resource name="science" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});

export default card;
