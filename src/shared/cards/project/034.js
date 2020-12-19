import React from 'react';
import Active from '../Active';
import { Resource, Param } from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Add 1 microbe to this card, or remove 2 microbes to raise temperature 1 step.';
const desc = 'Requires 4% oxygen.';

const card = new Active({
  number: '034',
  title: 'GHG Producing Bacteria',
  cost: 8,
  tags: ['science', 'microbe'],
  restriction: {
    value: 4,
    param: 'oxygen'
  },
  activeDesc,
  desc,
  resource: 'microbe',
  flavor: 'Working for the biosphere and the atmosphere at the same time',
  actions: [
    {
      name: 'Add 1 Microbe',
      log: ['add a microbe ', { resource: 'microbe' }],
      icon: <Resource name="microbe" />,
      action: (player, game) => {
        game.cardResource(player, card, 1);
      }
    },
    {
      name: 'Raise Temperature',
      log: ['raise temperature ', { param: 'temperature' }],
      icon: <Param name="oxygen" />,
      canPlay: (player, game) => {
        const valid = game.cardResource(player, card) >= 2;
        return {
          valid,
          msg: 'Not enough microbes'
        };
      },
      action: (player, game, done) => {
        game.cardResource(player, card, -2);
        game.param(player, 'temperature', done);
      }
    }
  ],
  emoji: '🦠',
  activeLayout: (
    <div>
      <div className="table center">
        <div className="row">
          <div className="cell middle"></div>
          <div className="cell middle resources">
            <div>
              <span className="arrow" />
            </div>
          </div>
          <div className="cell middle resources text-center">
            <div>
              <Resource name="microbe" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="cell middle resources">
            <span>OR</span>
            <Resource name="microbe" />
            <Resource name="microbe" />
          </div>
          <div className="cell middle resources">
            <div>
              <span className="arrow" />
            </div>
          </div>
          <div className="cell middle resources text-center">
            <div>
              <Param name="temperature" />
            </div>
          </div>
        </div>
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div className="m-top m-bottom description text-center">{desc}</div>
});

export default card;
