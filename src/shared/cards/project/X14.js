import React from 'react';
import Active from '../Active';
import {
  Resource,
  Tag,
  VictoryPoint,
  Production,
  Param
} from '../../../client/game/components/assets/Assets';

// TODO prevent removing plants

const activeDesc =
  'Action: REVEAL AND DISCARD the top card of the deck. If it has a space tag, add an asteroid here.';
const desc =
  'Decrease energy production 1 step. 1 VP per asteroid on this card.';

const card = new Active({
  number: 'X14',
  title: 'Asteroid Deflection System',
  cost: 13,
  tags: ['earth', 'space', 'building'],
  set: 'promo',
  activeDesc,
  desc,
  resource: 'asteroid',
  flavor:
    'Protecting Earth and Mars from incoming asteroids. And reminding people about it',
  production: { power: -1 },
  actions: [
    {
      name: 'Reveal card',
      log: ['reveal card'],
      icon: (
        <>
          <span className="arrow" />
          <Param name="card back" />
        </>
      ),
      action: (player, game) => {
        const reveal = game.revealCards(player, null, 1, 'space', {
          tag: 'space'
        })[0];

        game.cards.discard.push({ card: reveal.number });

        if (reveal.tags.includes('space')) {
          game.cardResource(player, card, 1);

          game.pushLog(player, [
            ' deflected an asteroid! ',
            { tag: 'asteroid' }
          ]);
        } else {
          game.pushLog(player, [' did not deflect an asteroid. 😔']);
        }
      }
    }
  ],
  vp: (player, game) => game.cardResource(player, card),
  emoji: '🌑',
  todo: true,
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span className="arrow" />
        <Param name="card back" />*
        <Resource name="blank" />
        <Tag name="space" />
        <span>:</span>
        <Resource name="asteroid" />
      </div>
      <div className="description text-center">{activeDesc}</div>
      <div className="flex">
        <div className="col-1" />
        <div className="col-4 strong sans-serif m-top text-center">
          OPPONENTS MAY NOT REMOVE YOUR PLANTS
        </div>
        <div className="col-1" />
      </div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-1 middle">
        <Production>
          <div className="flex">
            <div>&ndash;</div>
            <Resource name="power" />
          </div>
        </Production>
      </div>
      <div className="col-2 description middle text-center">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/<Resource name="asteroid" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});

export default card;
