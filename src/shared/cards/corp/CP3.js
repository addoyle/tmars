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

const isMin = (player, prod) =>
  player.production[prod] === Math.min(...Object.values(player.production));

export default new Corporation({
  number: 'CP3',
  title: 'Robinson Industries',
  titleClass: 'robinson-industries',
  resources: { megacredit: 47 },
  actions: [
    {
      name: 'Increase M€ Production',
      log: ['increase M€ production ', { megacredit: null }],
      icon: (
        <Production>
          <div className="flex">
            <MegaCredit value="1" />
          </div>
        </Production>
      ),
      canPlay: player => {
        const valid = isMin(player, 'megacredit');
        return {
          valid,
          msg: !valid ? 'M€ production is not the lowest' : null
        };
      },
      action: (player, game) => {
        game.resources(player, 'megacredit', -4);
        game.production(player, 'megacredit', 1);
      }
    },
    {
      name: 'Increase Steel Production',
      log: ['increase steel production ', { resource: 'steel' }],
      icon: (
        <Production>
          <div className="flex">
            <Resource name="steel" />
          </div>
        </Production>
      ),
      canPlay: player => {
        const valid = isMin(player, 'steel');
        return {
          valid,
          msg: !valid ? 'Steel production is not the lowest' : null
        };
      },
      action: (player, game) => {
        game.resources(player, 'megacredit', -4);
        game.production(player, 'steel', 1);
      }
    },
    {
      name: 'Increase Titanium Production',
      log: ['increase titanium production ', { resource: 'titanium' }],
      icon: (
        <Production>
          <div className="flex">
            <Resource name="titanium" />
          </div>
        </Production>
      ),
      canPlay: player => {
        const valid = isMin(player, 'titanium');
        return {
          valid,
          msg: !valid ? 'Titanium production is not the lowest' : null
        };
      },
      action: (player, game) => {
        game.resources(player, 'megacredit', -4);
        game.production(player, 'titanium', 1);
      }
    },
    {
      name: 'Increase Plant Production',
      log: ['increase plant production ', { resource: 'plant' }],
      icon: (
        <Production>
          <div className="flex">
            <Resource name="plant" />
          </div>
        </Production>
      ),
      canPlay: player => {
        const valid = isMin(player, 'plant');
        return {
          valid,
          msg: !valid ? 'Plant production is not the lowest' : null
        };
      },
      action: (player, game) => {
        game.resources(player, 'megacredit', -4);
        game.production(player, 'plant', 1);
      }
    },
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
        const valid = isMin(player, 'power');
        return {
          valid,
          msg: !valid ? 'Energy production is not the lowest' : null
        };
      },
      action: (player, game) => {
        game.resources(player, 'megacredit', -4);
        game.production(player, 'power', 1);
      }
    },
    {
      name: 'Increase Heat Production',
      log: ['increase heat production ', { resource: 'heat' }],
      icon: (
        <Production>
          <div className="flex">
            <Resource name="heat" />
          </div>
        </Production>
      ),
      canPlay: player => {
        const valid = isMin(player, 'heat');
        return {
          valid,
          msg: !valid ? 'Heat production is not the lowest' : null
        };
      },
      action: (player, game) => {
        game.resources(player, 'megacredit', -4);
        game.production(player, 'heat', 1);
      }
    }
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
