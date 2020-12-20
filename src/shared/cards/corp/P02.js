import React from 'react';
import Corporation from '../Corporation';
import {
  MegaCredit,
  Tag,
  Resource,
  Param,
  Production
} from '../../../client/game/components/assets/Assets';

const desc = 'You start with 38 M€ and 1 titanium production.';
const effectDesc =
  'Effect: When you play an earth tag, including this, draw a card.';

export default new Corporation({
  number: 'P02',
  title: 'Point Luna',
  titleClass: 'point-luna',
  starting: (player, game) => {
    game.resources(player, 'megacredit', 38);
    game.production(player, 'titanium', 1);

    // Effects don't happen in the starting phase, so perform action now
    game.drawCard(player);
  },
  tags: ['earth', 'space'],
  set: 'prelude',
  desc,
  effectDesc,
  todo: true,
  flavor:
    'The Moon is a perfect springboard to the solar system, and the mining company Point Luna has the largest spaceport on Luna, making it a perfect partner for Earth inventors wanting to realize their space projects',
  layout: (
    <div className="flex gutter">
      <div className="col-2 middle">
        <div className="flex gutter">
          <div className="col-1 resources text-right middle">
            <MegaCredit value="38" />
          </div>
          <div className="col-1 middle">
            <Production>
              <div className="flex">
                <Resource name="titanium" />
              </div>
            </Production>
          </div>
        </div>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-3 middle">
        <div className="effect">
          <div className="effect-title">Effect</div>
          <div className="resources">
            <Tag name="earth" />:<Param name="card back" />
          </div>
          <div className="description">{effectDesc}</div>
        </div>
      </div>
    </div>
  )
});
