import React from 'react';
import Corporation from '../Corporation';
import {
  MegaCredit,
  Resource,
  Tag,
  Param
} from '../../../client/game/components/assets/Assets';

const desc =
  'You start with 44 M€. As your first action, reveal cards until you have revealed a microbe tag. Take that card into hand, and discard the rest.';
const effectDesc =
  'Effect: Each time a microbe tag is played, including this, THAT PLAYER gains 2€, or adds a microbe to THAT card, and you gain 2€.';

export default new Corporation({
  number: 'CORP14',
  title: 'Splice',
  titleClass: 'splice',
  resources: { megacredit: 44 },
  startingAction: {
    drawCard: {
      num: 1,
      tag: 'microbe'
    }
  },
  tags: ['microbe'],
  set: 'promo',
  desc,
  effectDesc,
  events: {
    onAnyCardPlayed: (player, game, playedCard, targetPlayer, done) => {
      if (playedCard.tags.includes('microbe')) {
        game.resources(player, 'megacredit', 2);

        // TODO: Target player gets to choose one or the other
        done();
      }
    }
  },
  todo: true,
  flavor:
    'Holding the patents on a number of key gene lines, Splice is the natural for any project involving adapted microorganisms.',
  layout: (
    <div className="flex gutter">
      <div className="col-3 bottom">
        <div className="flex">
          <div className="resources middle center">
            <MegaCredit value="44" />
          </div>
          <div className="resources middle center">
            <Param name="card back" tag="microbe" />
          </div>
        </div>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-4 middle">
        <div className="effect">
          <div className="effect-title m-bottom">Effect</div>
          <div className="center inline-block">
            <div className="resources middle text-left">
              <Tag name="microbe" anyone /> : <MegaCredit value="2" anyone />*{' '}
              <span>OR</span> <Resource name="microbe" anyone />*
            </div>
            <div className="resources middle text-left">
              <Tag name="microbe" anyone /> : <MegaCredit value="2" />
            </div>
          </div>
          <div className="description">{effectDesc}</div>
        </div>
      </div>
    </div>
  )
});
