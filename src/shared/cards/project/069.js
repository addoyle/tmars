import React from 'react';
import Active from '../Active';
import {
  Resource,
  Production,
  VictoryPoint,
  MegaCredit
} from '../../../client/game/components/assets/Assets';

const activeDesc = 'Action: Spend 1 plant or 1 steel to gain 7 M€.';
const desc =
  'Oxygen must be 8% or less. Decrease your energy production 1 step.';

export default new Active({
  number: '069',
  title: 'Electro Catapult',
  cost: 17,
  tags: ['building'],
  set: 'corporate',
  restriction: {
    max: true,
    value: 8,
    param: 'oxygen'
  },
  activeDesc,
  desc,
  flavor:
    'A 200 km long acceleration ramp up the side of Pavonis Mons, hurtling export goods into space',
  action: (player, game) => game.production(player, 'power', -1),
  canPlay: player => {
    const valid = player.resources.power > 0;
    return {
      valid,
      msg: !valid ? 'Not enough energy production' : null
    };
  },
  actions: [
    {
      name: 'Spend 1 Plant',
      icon: <Resource name="plant" />,
      canPlay: player => {
        const valid = player.resources.plant >= 1;
        return {
          valid,
          msg: 'Not enough plants'
        };
      },
      action: (player, game) => {
        game.resources(player, 'plant', -1);
        game.resources(player, 'megacredit', 7);
      }
    },
    {
      name: 'Spend 1 Steel',
      icon: <Resource name="steel" />,
      canPlay: player => {
        const valid = player.resources.steel >= 1;
        return {
          valid,
          msg: 'Not enough steel'
        };
      },
      action: (player, game) => {
        game.resources(player, 'steel', -1);
        game.resources(player, 'megacredit', 7);
      }
    }
  ],
  vp: 1,
  emoji: '🏸',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Resource name="plant" />
        /
        <Resource name="steel" />
        <span className="arrow" />
        <MegaCredit value="7" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <Production>
          <div className="flex">
            <div>&ndash;</div>
            <Resource name="power" />
          </div>
        </Production>
      </div>
      <div className="col-3 middle description">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
