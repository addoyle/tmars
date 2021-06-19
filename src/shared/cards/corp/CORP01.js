import React from 'react';
import Corporation from '../Corporation';
import { MegaCredit } from '../../../client/game/components/assets/Assets';

const desc = 'You start with 57 M€.';
const effectDesc =
  'Effect: After you pay for a card or standard project with a basic cost of 20 M€ or more, you gain 4 M€.';

const onThingPlayed = (player, game, thing) =>
  thing.cost >= 20 && game.resources(player, 'megacredit', 4);

export default new Corporation({
  number: 'CORP01',
  title: 'CrediCor',
  titleClass: 'credicor',
  resources: { megacredit: 57 },
  tags: [],
  desc,
  effectDesc,
  flavor:
    "Multibillionaire Bard Hunter likes terraforming, especially when it involves hurling asteroids at Mars. He also has a hunch that it's going to pay off. His company CrediCor has all the resources he needs to jump right into the contest.",
  events: {
    onCardPlayed: onThingPlayed,
    onStandardProject: onThingPlayed
  },
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <div className="resources text-center">
          <MegaCredit value="57" />
        </div>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-2 middle">
        <div className="effect">
          <div className="effect-title">Effect</div>
          <div className="resources">
            <span>&ndash;</span>
            <MegaCredit value="20" /> : <MegaCredit value="4" />
          </div>
          <div className="description">{effectDesc}</div>
        </div>
      </div>
    </div>
  )
});
