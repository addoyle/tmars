import React from 'react';
import Active from '../Active';
import {
  Resource,
  MegaCredit,
  Tag,
  VictoryPoint,
  Param
} from '../../../client/game/components/assets/Assets';

const desc =
  'Oxygen must be 6% or less. 3 VPs if you have one or more science resources here.';
const activeDesc =
  'Action: Spend 1 M€ to reveal and discard the top card of the draw deck. If that card has a microbe tag, add a science resource here.';

const card = new Active({
  number: '005',
  title: 'Search For Life',
  cost: 3,
  tags: ['science'],
  restriction: {
    max: true,
    value: 6,
    param: 'oxygen'
  },
  desc,
  activeDesc,
  resource: 'science',
  flavor:
    "Finding native life-forms would be the greatest discovery in history, so let's find out!",
  actions: [
    {
      name: 'Search for life',
      log: ['search for life'],
      icon: (
        <>
          <MegaCredit value={1} />
          <span className="arrow" />
          <Param name="card back" tag="microbe" />
        </>
      ),
      megacredit: -1,
      action: (player, game) => {
        const reveal = game.cardStore.get(
          game.revealCards(player, null, 1, 'microbe', {
            tag: 'microbe'
          })[0].card
        );

        game.cards.discard.push({ card: reveal.number });

        if (reveal.tags.includes('microbe')) {
          game.cardResource(player, card, 1);

          game.pushLog(player, [' found life! ', { tag: 'microbe' }]);
        } else {
          game.pushLog(player, [' did not find life. 😔']);
        }
      }
    }
  ],
  vp: (player, game) => game.cardResource(player, card) * 3,
  emoji: '🔍',
  activeLayout: (
    <div>
      <div className="center text-center">
        <div className="resources">
          <MegaCredit value="1" />
          <span className="arrow" />
          <Tag name="microbe" />
          *:
          <Resource name="science" />
        </div>
        <div className="description text-center">{activeDesc}</div>
      </div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-4 description text-center middle">{desc}</div>
      <div className="col-1 middle">
        <VictoryPoint>
          <span>
            <Resource name="science" />
            *: <span className="point">3</span>
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});

export default card;
