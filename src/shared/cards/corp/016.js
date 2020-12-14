import React from 'react';
import Corporation from '../Corporation';
import {
  MegaCredit,
  Resource,
  Param,
  Production
} from '../../../client/game/components/assets/Assets';

const desc = 'You start with 47 M€ and 1 plant production.';
const effectDesc =
  'Effect: Whenever Venus is terraformed 1 step, you gain 2 M€.';

export default new Corporation({
  number: 16,
  title: 'Aphrodite',
  titleClass: 'aphrodite',
  starting: {
    resources: {
      megacredit: 47
    },
    production: {
      plant: 1
    }
  },
  firstAction: () => {},
  tags: ['venus', 'plant'],
  set: 'venus',
  desc,
  effectDesc,
  todo: true,
  flavor:
    'Soil experts Aphrodite acquired deveopment contracts for the Venus colonies, initiating a dedicated terraforming program.',
  layout: (
    <div className="flex gutter">
      <div className="col-3 bottom">
        <div className="flex">
          <div className="resources middle center">
            <MegaCredit value="47" />
          </div>
          <div className="middle center">
            <Production>
              <div className="flex">
                <Resource name="plant" />
              </div>
            </Production>
          </div>
        </div>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-4 middle">
        <div className="effect">
          <div className="effect-title m-bottom">Effect</div>
          <div className="center inline-block">
            <div className="resources middle">
              <Param name="venus" anyone /> : <MegaCredit value="2" />
            </div>
          </div>
          <div className="description">{effectDesc}</div>
        </div>
      </div>
    </div>
  )
});
