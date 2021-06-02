import React from 'react';
import Automated from '../Automated';
import {
  MegaCredit,
  Production,
  Resource,
  Tile
} from '../../../client/game/components/assets/Assets';

const desc =
  'Increase your M€ production 2 steps, and increase your energy production 1 step. Gain 3 plants and place a city tile.';

export default new Automated({
  number: 'X21',
  title: 'Field-Capped City',
  cost: 29,
  tags: ['power', 'city', 'building'],
  set: 'promo',
  desc,
  flavor:
    'Protecting an area by deflecting particle radiation to a central tower, which converts the radiation to energy that powers the deflecting magnetic field',
  production: {
    megacredit: 2,
    power: 1
  },
  resources: {
    plant: 3
  },
  tile: 'city',
  emoji: '🗼',
  layout: (
    <div className="flex">
      <div className="col-1 middle">
        <Production>
          <div className="flex">
            <MegaCredit value="2" />
          </div>
          <div className="flex">
            <Resource name="power" />
          </div>
        </Production>
      </div>
      <div className="col-4">
        <div className="resources">
          <Resource name="plant" />
          <Resource name="plant" />
          <Resource name="plant" />
          <Tile name="city" />
        </div>
        <div className="description">{desc}</div>
      </div>
    </div>
  )
});
