import React from 'react';
import Active from '../Active';
import {
  Resource,
  MegaCredit
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Add 1 microbe to this card, or spend any number of microbes here to gain the triple amount of M€.';
const desc = 'Requires Venus 6%.';

const card = new Active({
  number: '251',
  title: 'Sulphur-Eating Bacteria',
  cost: 6,
  tags: ['venus', 'microbe'],
  set: 'venus',
  restriction: {
    value: 6,
    param: 'venus'
  },
  activeDesc,
  desc,
  resource: 'microbe',
  flavor: 'Converting it into useful materials',
  actions: [
    {
      name: 'Add 1 Microbe',
      log: ['add a microbe ', { resource: 'microbe' }],
      icon: <Resource name="microbe" />,
      action: (player, game) => game.cardResource(player, card, 1)
    },
    {
      name: 'Spend Microbes',
      icon: <Resource name="microbe" />,
      counter: {
        name: 'Use Microbes',
        max: (player, game) => game.cardResource(player, card),
        icon: <Resource name="microbe" />,
        resultIcon: count => <MegaCredit value={count * 3} />
      },
      canPlay: (player, game, count) => {
        const valid = count > 0;
        return {
          valid,
          msg: !valid ? 'Requires at least 1 microbe' : null
        };
      },
      action: (player, game, done, count) => {
        game.resources(player, 'megacredit', count * 3);
        game.cardResource(player, card, -count);
        done();
      }
    }
  ],
  emoji: '🦠',
  activeLayout: (
    <div>
      <div className="table center">
        <div className="row">
          <div className="cell" />
          <div className="cell middle resources">
            <span className="arrow" />
            <Resource name="microbe" />
          </div>
        </div>
        <div className="row">
          <div className="cell middle resources">
            <span>OR X</span>
            <Resource name="microbe" />
          </div>
          <div className="cell middle resources">
            <span className="arrow" />
            <MegaCredit value="3X" />
          </div>
        </div>
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div className="description text-center m-top m-bottom">{desc}</div>
});

export default card;
