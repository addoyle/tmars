import React from 'react';
import Active from '../Active';
import {
  Resource,
  MegaCredit,
  Tag,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

// TODO action

const activeDesc =
  'Action: Spend 1 floater from here to gain 1 M€ for each floater here, INCLUDING THE PAID FLOATER (max 5).';
const desc = 'Add 1 floater for every Earth tag you have, including this.';

const card = new Active({
  number: 'X26',
  title: 'Meltworks',
  cost: 4,
  tags: ['building'],
  set: 'promo',
  activeDesc,
  desc,
  flavor: 'Believe the hype and become a cloudrider in this new extreme sport!',
  action: (player, game) => game.cardResource(player, card, player.tags.earth),
  actions: [
    {
      name: 'Spend 1 Floater',
      icon: <Resource name="floater" />,
      action: (player, game) => {
        game.resources(
          player,
          'megacredit',
          Math.min(game.cardResource(player, card), 5)
        );
        game.cardResource(player, card, -1);
      }
    }
  ],
  vp: 1,
  emoji: '🏄',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Resource name="floater" />
        <span className="arrow" />
        <MegaCredit value="1" />
        <span>/</span>
        <Resource name="floater" />
        <span>*(max 5)</span>
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-1 middle">
        <div className="resources">
          <Resource name="floater" />/<Tag name="earth" />
        </div>
      </div>
      <div className="col-1 description middle">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});

export default card;
