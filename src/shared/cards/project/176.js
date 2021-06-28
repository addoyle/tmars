import React from 'react';
import Automated from '../Automated';
import {
  Production,
  MegaCredit,
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  'Requires -20°C or warmer. Increase your M€ production 1 step and gain 2 plants.';

export default new Automated({
  number: '176',
  title: 'Noctis Farming',
  cost: 10,
  tags: ['plant', 'building'],
  restriction: {
    value: -20,
    param: 'temperature'
  },
  desc,
  flavor:
    'Utilizing the uniquely dense and moist atmosphere in the canyons of Noctis Labyrinthus',
  resources: {
    plant: 2
  },
  production: {
    megacredit: 1
  },
  vp: 1,
  emoji: '🚜',
  layout: (
    <div className="flex gutter">
      <div className="col-3 middle text-center">
        <div className="flex gutter center">
          <Production>
            <div className="flex">
              <MegaCredit value="1" />
            </div>
          </Production>
          <div className="resources middle">
            <Resource name="plant" />
            <Resource name="plant" />
          </div>
        </div>
        <div className="description m-top">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
