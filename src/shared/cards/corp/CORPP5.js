import React from 'react';
import Corporation from '../Corporation';
import {
  MegaCredit,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  'You start with 45 M€. As your first action, fund an award for free.';
const effectDesc =
  'Effect: When you play a card with a NON-NEGATIVE VP icon, including this, gain 3 M€.';

export default new Corporation({
  number: 'CORPP5',
  title: 'Vitor',
  titleClass: 'vitor',
  resources: { megacredit: 45 },
  startingAction: () => {
    // TODO
  },
  tags: ['earth'],
  set: 'prelude',
  desc,
  effectDesc,
  events: {
    onCardPlayed: (player, game, playedCard) =>
      // Exclude ONLY negative VP cards (1 per X VPs are also included)
      playedCard.vp !== undefined &&
      // Numeric comparisons with functions ALWAYS resolve to false
      !playedCard.vp < 0 &&
      // Get 3 M€
      game.resources(player, 'megacredit', 3)
  },
  todo: true,
  flavor:
    'A corporation grown from crowd funding of new innovations. Always inclined to initiate projects that can gain public support, as well as innovation prizes.',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <div className="flex gutter">
          <div className="col-2 resources text-center middle">
            <MegaCredit value="45" />
          </div>
          <div className="col-3 award-title text-center middle">Awards</div>
        </div>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-1 middle">
        <div className="effect">
          <div className="effect-title">Effect</div>
          <div className="flex center m-top m-bottom">
            <VictoryPoint>
              <span className="big point">?</span>
            </VictoryPoint>
            <div className="resources">
              * : <MegaCredit value="3" />
            </div>
          </div>
          <div className="description">{effectDesc}</div>
        </div>
      </div>
    </div>
  )
});
