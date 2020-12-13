import React from 'react';
import Automated from '../Automated';
import {
  Production,
  MegaCredit,
  Tile
} from '../../../client/game/components/assets/Assets';

const desc =
  'Increase your M€ production 2 steps. Place a greenery tile ON AN AREA RESERVED FOR OCEAN, disregarding normal placement restrictions, and increase oxygen 1 step.';

export default new Automated({
  number: 174,
  title: 'Protected Valley',
  cost: 23,
  tags: ['plant', 'building'],
  desc,
  flavor:
    'A fertile valley with higher air density and humidity, but in need of protection when the oceans rise',
  action: () => {},
  emoji: '🏞',
  todo: true,
  layout: (
    <div className="text-center">
      <div className="flex gutter center">
        <div className="middle">
          <Production>
            <div className="flex">
              <MegaCredit value="2" />
            </div>
          </Production>
        </div>
        <div className="resources">
          <Tile name="greenery" asterisk />
        </div>
      </div>
      <div className="description">{desc}</div>
    </div>
  )
});
