import React from 'react';
import Corporation from '../Corporation';
import {
  MegaCredit,
  Resource,
  Production
} from '../../../client/game/components/assets/Assets';

const desc = 'You start with 47 M€.';
const effectDesc =
  'Action: Spend 4 M€ to increase (one of) your LOWEST PRODUCTION 1 step.';

// Repeatable function to create all the action buttons
const createAction = (resource, label) => ({
  name: `Increase ${label} Production`,
  log: [
    `increase ${label} production`,
    resource === 'megacredit' ? { megacredit: null } : { resource }
  ],
  icon: (
    <Production>
      <div className="flex">
        {resource === 'megacredit' ? (
          <MegaCredit value="1" />
        ) : (
          <Resource name={resource} />
        )}
      </div>
    </Production>
  ),
  canPlay: player => {
    if (player.resources.megacredit < 4) {
      return { valid: false, msg: "Can't afford this" };
    }

    const valid =
      player.production[resource] ===
      Math.min(...Object.values(player.production));
    return {
      valid,
      msg: !valid ? `${label} production is not the lowest` : null
    };
  },
  resources: { megacredit: -4 },
  production: { [resource]: 1 }
});

export default new Corporation({
  number: 'CORPP3',
  title: 'Robinson Industries',
  titleClass: 'robinson-industries',
  resources: { megacredit: 47 },
  actions: [
    createAction('megacredit', 'M€'),
    createAction('steel', 'Steel'),
    createAction('titanium', 'Titanium'),
    createAction('plant', 'Plant'),
    createAction('power', 'Energy'),
    createAction('heat', 'Heat')
  ],
  tags: [],
  set: 'prelude',
  desc,
  effectDesc,
  flavor:
    'Buying into diverse businesses, Robinson Industries is soon expected to influence all aspects of Martian life',
  layout: (
    <div className="flex gutter">
      <div className="col-2 middle">
        <div className="flex gutter">
          <div className="col-1 resources text-center middle">
            <MegaCredit value="47" />
          </div>
        </div>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-3 middle">
        <div className="effect">
          <div className="effect-title">Action</div>
          <div className="resources">
            <MegaCredit value="4" />
            <span className="arrow" />
            <Production>
              <div className="flex">
                <Resource name="any" />
              </div>
            </Production>
            *
          </div>
          <div className="description m-top m-bottom">{effectDesc}</div>
        </div>
      </div>
    </div>
  )
});
