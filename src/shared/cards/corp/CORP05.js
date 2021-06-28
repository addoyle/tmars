import React from 'react';
import Corporation from '../Corporation';
import {
  MegaCredit,
  Resource,
  Tag
} from '../../../client/game/components/assets/Assets';

const desc = 'You start with 20 steel and 30 M€.';
const effectDesc = 'Effect: Each time you play an event, you gain 2 M€.';

export default new Corporation({
  number: 'CORP05',
  title: 'Interplanetary Cinematics',
  titleClass: 'interplanetary',
  resources: {
    megacredit: 30,
    steel: 20
  },
  tags: ['building'],
  desc,
  effectDesc,
  events: {
    onCardPlayed: (player, game, playedCard) =>
      // Card is an event
      playedCard.type === 'event' &&
      // Bump M€
      game.resources(player, 'megacredit', 2)
  },
  flavor:
    "Finding funding where nations struggled, IC initiated the colonization of Mars by turning the process into a soap opera infused with plenty of advertising. With the media's attention and a head start in colonization, IC sets out to terraform.",
  layout: (
    <div className="flex gutter">
      <div className="col-1 bottom">
        <div className="flex">
          <div className="resources middle center">
            <span>20</span>
            <Resource name="steel" />
          </div>
          <div className="resources middle center">
            <MegaCredit value="30" />
          </div>
        </div>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-1 middle">
        <div className="effect">
          <div className="effect-title">Effect</div>
          <div className="flex center">
            <div className="resources">
              <Tag name="event" /> : <MegaCredit value="2" />
            </div>
          </div>
          <div className="description">{effectDesc}</div>
        </div>
      </div>
    </div>
  )
});
