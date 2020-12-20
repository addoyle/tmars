import React from 'react';
import Corporation from '../Corporation';
import {
  MegaCredit,
  Resource,
  Production,
  Param
} from '../../../client/game/components/assets/Assets';

const desc = 'You start with 37 M€. Increase your steel production 1 step.';
const effectDesc =
  'Action: Increase your energy production 1 step IF YOU HAVE NO ENERGY RESOURCES, or spend 3 M€ to draw a building card.';

export default new Corporation({
  number: 'X02',
  title: 'Factorum',
  titleClass: 'factorum',
  starting: (player, game) => {
    game.resources(player, 'megacredit', 37);
    game.production(player, 'steel', 1);
  },
  actions: [
    {
      name: 'Increase Enery Production',
      log: ['increase energy production ', { resource: 'power' }],
      icon: (
        <Production>
          <div className="flex">
            <Resource name="power" />
          </div>
        </Production>
      ),
      canPlay: player => {
        const valid = player.resources.power <= 0;
        return {
          valid,
          msg: !valid ? 'Requires 0 energy resources' : null
        };
      },
      action: (player, game) => {
        game.production(player, 'power', 1);
      }
    },
    {
      name: 'Draw Building Card',
      log: ['draw a building card ', { tag: 'building' }],
      icon: <Param name="card back" tag="building" />,
      canPlay: player => {
        const valid = player.resources.megacredit >= 3;
        return {
          valid,
          msg: !valid ? 'Not enough M€' : null
        };
      },
      action: (player, game) => {
        game.resources(player, 'megacredit', -3);
        game.revealCards(
          player,
          card => card.tags.includes('building'),
          1,
          'building cards',
          { tag: 'building' }
        );
      }
    }
  ],
  tags: ['power', 'building'],
  set: 'promo',
  desc,
  effectDesc,
  flavor:
    'When the Martian society grew, Factorum made its name as the dominant industrial conglomerate on the planet.',
  layout: (
    <div>
      <div className="flex gutter">
        <div className="col-2 bottom text-center">
          <div className="resources">
            <MegaCredit value="37" />
            <Production>
              <div className="flex">
                <Resource name="steel" />
              </div>
            </Production>
          </div>
          <div className="description">{desc}</div>
        </div>
        <div className="col-3 text-center">
          <div className="effect">
            <div className="effect-title">Action</div>
            <div className="table">
              <div className="row">
                <div className="cell middle resources text-center">
                  <div>
                    <span className="arrow" />
                  </div>
                </div>
                <div className="cell middle resources text-center">
                  <Production>
                    <div className="flex">
                      <Resource name="power" />
                    </div>
                  </Production>
                </div>
                <div className="cell middle resources text-left">*</div>
                <div className="cell" />
              </div>
              <div className="row">
                <div className="cell middle resources text-center">
                  <span>OR</span>
                </div>
                <div className="cell middle resources">
                  <MegaCredit value="3" />
                </div>
                <div className="cell middle resources">
                  <div>
                    <span className="arrow" />
                  </div>
                </div>
                <div className="cell middle resources">
                  <div>
                    <Param name="card back" tag="building" />
                  </div>
                </div>
              </div>
            </div>
            <div className="description">{effectDesc}</div>
          </div>
        </div>
      </div>
    </div>
  )
});
