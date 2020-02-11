import React from 'react';
import Corporation from '../Corporation';
import { MegaCredit, Tag, Production } from '../../client/components/assets/Assets';

const desc = 'You start with 44 M€ and 3 M€ production.';
const effectDesc = 'Effect: When you play a building tag, you pay 2 M€ less for it.';

export default new Corporation({
  number: 'P01',
  title: 'Cheung Shing Mars',
  titleClass: 'cheung-shing-mars',
  starting: {
    resources: {
      mc: 44
    },
    production: {
      mc: 3
    }
  },
  tags: ['building'],
  desc,
  effectDesc,
  flavor: 'Asian contractor Mars Wall took an early lead in the construction of colonies and industries on Mars, making them a power to be reckoned with',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <div className="flex gutter">
          <div className="col-1 resources text-right middle">
            <MegaCredit value="44" />
          </div>
          <div className="col-1 middle">
            <Production>
              <div className="flex">
                <MegaCredit value="3" />
              </div>
            </Production>
          </div>
        </div>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-1 middle">
        <div className="effect">
          <div className="effect-title m-bottom">Effect</div>
          <div className="resources">
            <Tag name="building" />:<MegaCredit value="-2" />
          </div>
          <div className="description m-top m-bottom">{effectDesc}</div>
        </div>
      </div>
    </div>
  )
});
