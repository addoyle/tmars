import React from 'react';
import Active from '../Active';
import { Resource } from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Add 1 microbe to this card, or remove 3 microbes to increase your TR 1 step.';
const desc = 'Add 3 microbes to this card.';

const card = new Active({
  number: '157',
  title: 'Nitrite Reducing Bacteria',
  cost: 11,
  tags: ['microbe'],
  activeDesc,
  desc,
  resource: 'microbe',
  flavor:
    'Making use of the nitrites in the ground to release nitrogen into the atmosphere',
  action: (player, game) => {
    game.cardResource(player, card, 3);
  },
  actions: [
    {
      name: 'Add 1 Microbe',
      icon: <Resource name="microbe" />,
      action: (player, game) => game.cardResource(player, card, 1)
    },
    {
      name: 'Raise TR',
      log: ['raise TR ', { resource: 'tr' }],
      icon: <Resource name="tr" />,
      canPlay: (player, game) => {
        const valid = game.cardResource(player, card) >= 3;
        return {
          valid,
          msg: 'Not enough microbes'
        };
      },
      action: (player, game) => {
        game.cardResource(player, card, -3);
        game.tr(player, 1);
      }
    }
  ],
  emoji: '🦠️',
  activeLayout: (
    <div>
      <div className="table center">
        <div className="row">
          <div className="cell middle"></div>
          <div className="cell middle resources">
            <span className="arrow" />
          </div>
          <div className="cell middle resources">
            <Resource name="microbe" />
          </div>
        </div>
        <div className="row">
          <div className="cell middle resources">
            <span>OR 3</span>
            <Resource name="microbe" />
          </div>
          <div className="cell middle resources">
            <span className="arrow" />
          </div>
          <div className="cell middle resources">
            <Resource name="tr" />
          </div>
        </div>
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-2">
        <div className="resources">
          <Resource name="microbe" />
          <Resource name="microbe" />
          <Resource name="microbe" />
        </div>
      </div>
      <div className="col-3 description middle text-center">{desc}</div>
    </div>
  )
});

export default card;
