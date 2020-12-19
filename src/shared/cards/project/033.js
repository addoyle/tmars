import React from 'react';
import Active from '../Active';
import { Resource, Param } from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Add 1 microbe to this card, or remove 2 microbes from this card to raise oxygen level 1 step.';

const card = new Active({
  number: '033',
  title: 'Regolith Eaters',
  cost: 13,
  tags: ['science', 'microbe'],
  activeDesc,
  resource: 'microbe',
  flavor: 'Living on the rocks and excreting oxygen',
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
      name: 'Raise Oxygen',
      log: ['raise oxygen ', { param: 'oxygen' }],
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
        game.param(player, 'oxygen', done);
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
              <Param name="oxygen" />
            </div>
          </div>
        </div>
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div className="m-top m-bottom" />
});

export default card;
