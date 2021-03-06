import React from 'react';
import Corporation from '../Corporation';
import {
  MegaCredit,
  Resource,
  Tag,
  Production
} from '../../../client/game/components/assets/Assets';

const desc = 'You start with 1 energy production and 48 M€.';
const effectDesc =
  'Effect: When playing a power card OR THE STANDARD PROJECT POWER PLANT, you pay 3 M€ less for it.';

export default new Corporation({
  number: 'CORP09',
  title: 'ThorGate',
  titleClass: 'thorgate',
  action: player => {
    player.rates.cost.power = -3;
    player.rates.powerplant = 8;
  },
  resources: { megacredit: 48 },
  production: { power: 1 },
  tags: ['power'],
  desc,
  effectDesc,
  flavor:
    'As oil reserves ran out on Earth, Nordic ThorGate emerged as the new world leader in the energy field, with their cutting edge technology. Now that the colonies on Mars are growing, ThorGate leads the way in finding viable energy solutions.',
  layout: (
    <div className="flex gutter">
      <div className="col-2 middle">
        <div className="flex">
          <div className="bottom center">
            <Production>
              <div className="flex">
                <Resource name="power" />
              </div>
            </Production>
          </div>
          <div className="resources middle center">
            <MegaCredit value="48" />
          </div>
        </div>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-3 middle">
        <div className="effect">
          <div className="effect-title">Effect</div>
          <div className="flex center">
            <div className="resources">
              <Tag name="power" />* : <MegaCredit value="-3" />
            </div>
          </div>
          <div className="description">{effectDesc}</div>
        </div>
      </div>
    </div>
  )
});
