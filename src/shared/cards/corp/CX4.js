import React from 'react';
import Corporation from '../Corporation';
import {
  MegaCredit,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc = 'You start with 35 M€, and 3 asteroid resources here.';
const effectDesc =
  'Action: Either add 1 asteroid to ANY CARD or gain any standard resource, OR spend 1 asteroid here to gain 3 titanium.';

const card = new Corporation({
  number: 'CX4',
  title: 'AstroDrill',
  titleClass: 'astrodrill',
  resources: { megacredit: 35 },
  starting: (player, game) => game.cardResource(player, card, 3),
  tags: ['space'],
  set: 'promo',
  desc,
  // resource: 'asteroid',
  effectDesc,
  // todo: true,
  flavor:
    'When minerals got more rare on Earth, many corporations turned to the asteroids for more. AstroDrill made this an art form, quickly dismantling hundreds of small asteroids from the main asteroid belt, enabling export of a wide variety of materials',
  layout: (
    <div>
      <div className="flex gutter">
        <div className="col-2 middle text-center">
          <div className="resources">
            <MegaCredit value="35" />
            <Resource name="blank" />
            <span>3</span>
            <Resource name="asteroid" />
          </div>
          <div className="description">{desc}</div>
        </div>
        <div className="col-3">
          <div className="effect">
            <div className="effect-title">Action</div>
            <div className="table m-top">
              <div className="row">
                <div className="cell resources text-right">
                  <span className="arrow" />
                </div>
                <div className="cell resources text-left">
                  <Resource name="asteroid" />
                  */
                  <Resource name="any" />
                </div>
              </div>
              <div className="row">
                <div className="cell resources text-right">
                  <span>OR </span>
                </div>
                <div className="cell resources text-left">
                  <Resource name="asteroid" />
                  <span className="arrow" />
                  <span>3</span>
                  <Resource name="titanium" />
                </div>
              </div>
            </div>
            <div className="m-top description">{effectDesc}</div>
          </div>
        </div>
      </div>
    </div>
  )
});

export default card;
