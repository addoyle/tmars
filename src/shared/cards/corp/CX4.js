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
  actions: [
    {
      name: 'Add 1 Asteroid to ANY card',
      log: ['add an asteroid ', { resource: 'asteroid' }],
      icon: (
        <>
          <Resource name="asteroid" />*
        </>
      ),
      action: (player, game, done) => {
        // TODO
        done();
      }
    },
    {
      name: 'Gain 1 M€',
      log: ['gain 1 M€ ', { megacredit: null }],
      icon: <MegaCredit />,
      action: (player, game) => game.resources(player, 'megacredit', 1)
    },
    {
      name: 'Gain 1 Steel',
      log: ['gain 1 steel ', { resource: 'steel' }],
      icon: <Resource name="steel" />,
      action: (player, game) => game.resources(player, 'steel', 1)
    },
    {
      name: 'Gain 1 Titanium',
      log: ['gain 1 titanium ', { resource: 'titanium' }],
      icon: <Resource name="titanium" />,
      action: (player, game) => game.resources(player, 'titanium', 1)
    },
    {
      name: 'Gain 1 Plant',
      log: ['gain 1 plant ', { resource: 'plant' }],
      icon: <Resource name="plant" />,
      action: (player, game) => game.resources(player, 'plant', 1)
    },
    {
      name: 'Gain 1 Energy',
      log: ['gain 1 energy ', { resource: 'power' }],
      icon: <Resource name="power" />,
      action: (player, game) => game.resources(player, 'power', 1)
    },
    {
      name: 'Gain 1 Heat',
      log: ['gain 1 heat ', { resource: 'heat' }],
      icon: <Resource name="heat" />,
      action: (player, game) => game.resources(player, 'heat', 1)
    },
    {
      name: 'Spend 1 Asteroid',
      log: ['spend 1 asteroid ', { resource: 'asteroid' }],
      icon: <Resource name="asteroid" />,
      canPlay: (player, game) => {
        const valid = game.cardResource(player, card) >= 1;
        return {
          valid,
          msg: !valid ? 'Not enough asteroids' : null
        };
      },
      action: (player, game) => {
        game.resources(player, 'titanium', 3);
        game.cardResource(player, card, -1);
      }
    }
  ],
  tags: ['space'],
  set: 'promo',
  desc,
  resource: 'asteroid',
  effectDesc,
  // todo: true,
  flavor:
    'When minerals got more rare on Earth, many corporations turned to the asteroids for more. AstroDrill made this an art form, quickly dismantling hundreds of small asteroids from the main asteroid belt, enabling export of a wide variety of materials',
  layout: (
    <div>
      <div className="flex gutter">
        <div className="col-2 bottom m-bottom text-center">
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
