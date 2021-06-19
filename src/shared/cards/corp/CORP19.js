import React from 'react';
import Corporation from '../Corporation';
import {
  MegaCredit,
  Param,
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  'You start with 42 M€. As your first action, reveal cards from the deck until you have revealed 2 cards with a floater icon on it. Take those 2 cards into hand, and discard the rest. 1 VP per 3 floaters on this card.';
const effectDesc = 'Action: Add a floater to ANY card.';

const card = new Corporation({
  number: 'CORP19',
  title: 'Celestic',
  titleClass: 'celestic',
  resources: { megacredit: 42 },
  startingAction: (player, game) =>
    // drawCard: {
    //   num: 2,
    //   resource: 'floater'
    // },
    game.keepSelected(
      player,
      game.revealCards(
        player,
        card => card.resource === 'floater',
        2,
        'floater cards',
        { resource: 'floater' }
      )
    ),
  tags: ['venus'],
  set: 'venus',
  desc,
  effectDesc,
  resource: 'floater',
  todo: true,
  vp: (player, game) => Math.floor(game.cardResource(player, card) / 3),
  flavor:
    'Specializing in atmospheric infrastructure, Celestic has a key position when it comes to colonization of Venus and Titan.',
  layout: (
    <div>
      <div className="flex gutter">
        <div className="col-1 bottom">
          <div className="flex">
            <div className="resources middle center">
              <MegaCredit value="42" />
            </div>
            <div className="resources middle center">
              <Param name="card back" resource="floater" />{' '}
              <Param name="card back" resource="floater" />
            </div>
          </div>
        </div>
        <div className="col-1 middle">
          <div className="effect">
            <div className="effect-title">Action</div>
            <div className="resources">
              <span className="arrow" />
              <Resource name="floater" />*
            </div>
            <div className="description">{effectDesc}</div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="description middle">{desc}</div>
        <div className="bottom">
          <VictoryPoint>
            <span>
              <span className="point">1</span>/3
              <Resource name="floater" />
            </span>
          </VictoryPoint>
        </div>
      </div>
    </div>
  )
});

export default card;
