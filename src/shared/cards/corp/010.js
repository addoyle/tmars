import React from 'react';
import Corporation from '../Corporation';
import {
  MegaCredit,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc = 'You start with 40 M€.';
const actionDesc =
  'Action: If your Terraforming Rating was raised this generation, you may pay 3 M€ to raise it 1 step more.';

export default new Corporation({
  number: '010',
  title: 'United Nations Mars Initiative',
  titleClass: 'unmi',
  starting: (player, game) => game.resources(player, 'megacredit', 40),
  actions: [
    {
      name: 'Raise TR',
      log: ['raise TR ', { resource: 'tr' }],
      icon: <Resource name="tr" />,
      canPlay: () => {
        // TODO: figure out how to check if TR was raised this gen
        const valid = true;
        return {
          valid,
          msg: !valid ? 'Your TR has not been raised this generation' : null
        };
      },
      action: (player, game) => {
        game.resources(player, 'megacredit', -3);
        game.tr(player, 1);
      }
    }
  ],
  tags: ['earth'],
  desc,
  actionDesc,
  todo: true,
  flavor:
    "UNMI is the organization carrying out the World Government's own terraforming projects. After the terraforming announcement, the UNMI got competition from different corporations, but is still a major force behind Mars' development.",
  layout: (
    <div className="flex gutter">
      <div className="col-2" />
      <div className="col-3 middle">
        <div className="flex m-bottom">
          <div className="col-3">
            <div className="resources text-center">
              <MegaCredit value="40" />
            </div>
            <div className="description text-center">{desc}</div>
          </div>
          <div className="col-2" />
        </div>
        <div className="effect">
          <div className="effect-title">Action</div>
          <div className="flex center">
            <div className="resources">
              <MegaCredit value="3" />
              <span className="arrow" />
              <Resource name="tr" />
            </div>
          </div>
          <div className="description">{actionDesc}</div>
        </div>
      </div>
    </div>
  )
});
