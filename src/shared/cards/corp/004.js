import React from 'react';
import Corporation from '../Corporation';
import {
  MegaCredit,
  Resource,
  Production
} from '../../../client/game/components/assets/Assets';

const desc = 'You start with 30 M€, 5 steel, and 1 steel production.';
const effectDesc =
  'Effect: Each time you get any steel or titanium as a placement bonus on the map, increase your steel prodution 1 step.';

export default new Corporation({
  number: '004',
  title: 'Mining Guild',
  titleClass: 'mining-guild',
  startingMC: 30,
  starting: (player, game) => {
    game.resources(player, 'steel', 5);
    game.production(player, 'steel', 1);
  },
  tags: ['building', 'building'],
  desc,
  effectDesc,
  events: {
    onTile: (player, game, tile) =>
      ['steel', 'titanium'].some(r => tile.resources?.includes(r)) &&
      game.production(player, 'steel', 1)
  },
  flavor:
    'Developers of ultra-light solar sails, Helion now turns to the terraforming of Mars and other worlds. It promises to be a rewarding business, as Helion has already made a working model of a soletta, focusing sunlight down to the frozen planet.',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <div className="flex">
          <div className="resources middle center">
            <MegaCredit value="30" />
          </div>
          <div className="resources middle center">
            <span>5</span>
            <Resource name="steel" />
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
      <div className="col-1 middle">
        <div className="effect">
          <div className="effect-title">Effect</div>
          <div className="flex center">
            <div className="resources middle">
              <Resource name="steel" />/<Resource name="titanium" /> :&nbsp;
            </div>
            <Production>
              <div className="flex">
                <Resource name="steel" />
              </div>
            </Production>
          </div>
          <div className="description">{effectDesc}</div>
        </div>
      </div>
    </div>
  )
});
