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
  number: 'CORPP2',
  title: 'Point Luna',
  titleClass: 'point-luna',
  resources: { megacredit: 38 },
  production: { titanium: 1 },
  drawCard: 1, // Effects aren't fired in the starting phase, so perform action now
  tags: ['earth', 'space'],
  set: 'prelude',
  desc,
  effectDesc,
  events: {
    onCardPlayed: (player, game, playedCard) =>
      // NOT an event
      playedCard.type !== 'Event' &&
      // Has an earth tag
      playedCard.tags.includes('earth') &&
      // Draw a card
      game.drawCard(player)
  },
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
