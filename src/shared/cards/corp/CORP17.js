import React from 'react';
import Corporation from '../Corporation';
import {
  MegaCredit,
  Resource,
  Production
} from '../../../client/game/components/assets/Assets';

const desc = 'You start with 1 steel production and 35 M€.';
const effectDesc =
  'Effect: For each step you increase the production of a resource, including this, you also gain that resource.';

export default new Corporation({
  number: 'CORP17',
  title: 'Manutech',
  titleClass: 'manutech',
  resources: { megacredit: 35 },
  production: { steel: 1 },
  tags: ['building'],
  set: 'venus',
  desc,
  effectDesc,
  events: {
    onProductionChange: (player, game, resource, change) =>
      change > 0 && game.resources(player, resource, change)
  },
  flavor:
    'Manutech is specialized in supplying steel and plastic components. Its efficient organization leads to quick results, making it a worthy contender in the terraforming of Mars.',
  layout: (
    <div className="flex gutter">
      <div className="col-3 bottom">
        <div className="flex">
          <div className="resources middle center">
            <MegaCredit value="35" />
          </div>
          <div className="middle center">
            <Production>
              <div className="flex">
                <Resource name="steel" />
              </div>
            </Production>
          </div>
        </div>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-4 middle">
        <div className="effect">
          <div className="effect-title m-bottom">Effect</div>
          <div className="center flex">
            <Production>
              <div className="flex">
                <Resource name="any" />
              </div>
            </Production>
            <div className="resources middle">
              &nbsp;: <Resource name="any" />
            </div>
          </div>
          <div className="description">{effectDesc}</div>
        </div>
      </div>
    </div>
  )
});
