import React from 'react';
import Corporation from '../Corporation';
import {
  MegaCredit,
  Param
} from '../../../client/game/components/assets/Assets';
import Restriction from '../../../client/game/components/assets/Restriction';

const desc =
  'You start with 50 M€. As your first action, reveal cards from the deck until you have revealed 3 Venus-tag cards. Take those into hand and discard the rest.';
const effectDesc =
  'Effect: Your Venus requirements are +/- 2 steps, your choice in each case.';

export default new Corporation({
  number: '020',
  title: 'Morning Star Inc.',
  titleClass: 'msi',
  startingMC: 50,
  firstAction: (player, game) =>
    game.keepSelected(
      player,
      game.revealCards(
        player,
        card => card.tags.includes('venus'),
        3,
        'venus cards',
        { tag: 'venus' }
      )
    ),
  tags: ['venus'],
  set: 'venus',
  desc,
  effectDesc,
  todo: true,
  flavor:
    'Morning Star Inc was formed when Inventrix early on decided to sell off their Venus-specific technologies. Now the scientists of MSI are ready to bring human colonies to Venus.',
  layout: (
    <div className="flex gutter">
      <div className="col-4 bottom">
        <div className="flex">
          <div className="resources middle center">
            <MegaCredit value="50" />
          </div>
          <div className="resources middle center">
            <Param name="card back" tag="venus" />{' '}
            <Param name="card back" tag="venus" />{' '}
            <Param name="card back" tag="venus" />
          </div>
        </div>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-3 middle">
        <div className="effect">
          <div className="effect-title">Effect</div>
          <div className="flex center" style={{ margin: '.5em auto' }}>
            <div className="resources middle">
              <Restriction values={[{ param: 'venus' }]} />
            </div>
            <div className="resources middle">: +/-2</div>
          </div>
          <div className="description">{effectDesc}</div>
        </div>
      </div>
    </div>
  )
});
