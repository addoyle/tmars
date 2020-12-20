import React from 'react';
import Active from '../Active';
import {
  Resource,
  Production
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Add 1 floater to this card, or spend 1 floater here to increase your energy production 1 step..';

const card = new Active({
  number: '221',
  title: 'Deuterium Export',
  cost: 11,
  tags: ['venus', 'power', 'space'],
  set: 'venus',
  activeDesc,
  resource: 'floater',
  flavor:
    'The D/H ratio on Venus is 100 times higher than on Earth, making it worthwile to extract and use on fusion power plants',
  actions: [
    {
      name: 'Add 1 Floater',
      log: ['add a floater ', { resource: 'floater' }],
      icon: <Resource name="floater" />,
      action: (player, game) => game.cardResource(player, card, 1)
    },
    {
      name: 'Raise Enery Production',
      log: ['raise energy production ', { production: 'power' }],
      icon: (
        <Production>
          <div className="flex">
            <Resource name="power" />
          </div>
        </Production>
      ),
      canPlay: (player, game) => {
        const valid = game.cardResource(player, card) >= 1;
        return {
          valid,
          msg: !valid ? 'Not enough floaters' : null
        };
      },
      action: (player, game) => {
        game.cardResource(player, card, -1);
        game.production(player, 'power', 1);
      }
    }
  ],
  emoji: '🛢️',
  activeLayout: (
    <div>
      <div className="table center">
        <div className="row">
          <div className="cell middle"></div>
          <div className="cell middle resources">
            <span className="arrow" />
          </div>
          <div className="cell middle resources text-center">
            <Resource name="floater" />
          </div>
        </div>
        <div className="row">
          <div className="cell middle resources">
            <span>OR</span>
            <Resource name="floater" />
          </div>
          <div className="cell middle resources">
            <span className="arrow" />
          </div>
          <div className="cell middle resources text-center">
            <Production>
              <div className="flex">
                <Resource name="power" />
              </div>
            </Production>
          </div>
        </div>
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div />
});

export default card;
