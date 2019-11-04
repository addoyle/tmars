import React from 'react';
import Corporation from '../../client/components/Corporation';
import { MegaCredit, Resource, Production } from '../../client/components/assets/Assets';

const desc = 'You start with 48 M€. Increase your M€ production 4 steps. ALL OPPONENTS DECREASE THEIR M€ PRODUCTION 2 STEPS. THIS DOES NOT TRIGGER THE EFFECT BELOW.';
const effectDesc = 'Effect: When a player causes another player to decrease production or lose resources, pay 3 M€ to the victim, or as much as possible.';

export default new Corporation({
  number: 'X01',
  title: 'Mons Insurance',
  titleClass: 'mons',
  starting: {
    mc: 48,
    production: {
      mc: 4
    }
  },
  tags: [],
  set: 'promo',
  desc,
  effectDesc,
  flavor: 'With incoming asteroids and an unpredictable environment, any venture on Mars is a risky business. As the only insurance company on Mars, Mons Insurance has a busy time keeping up with all the claims.',
  layout: (
    <div>
      <div className="flex gutter">
        <div className="col-1" />
        <div className="col-3 text-center">
          <div className="resources">
            <MegaCredit value="38" />
            <Production>
              <div className="flex">
                <MegaCredit value="4" />
                <MegaCredit value="-2" anyone />
              </div>
            </Production>
          </div>
          <div className="description">{desc}</div>
        </div>
      </div>

      <div className="flex">
        <div className="effect">
          <div className="effect-title">Effect</div>
          <div className="resources text-center">
            <Production>
              <div className="flex">
                <div>&ndash;</div>
                <Resource name="any" anyone />
              </div>
            </Production>
            &nbsp;<span>OR</span>&nbsp;
            <Resource name="any" anyone />:
            &nbsp;<span>PAY</span>&nbsp;
            <MegaCredit value="3" />*
          </div>
          <div className="description">{effectDesc}</div>
        </div>
      </div>
    </div>
  )
});
