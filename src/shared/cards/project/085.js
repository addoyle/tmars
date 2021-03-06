import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource,
  MegaCredit,
  Tile,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  'Decrease your energy production 1 step and increase your M€ production 4 steps. Place this tile. 1 VP PER ADJACENT CITY TILE.';

const card = new Automated({
  number: '085',
  title: 'Commercial District',
  cost: 16,
  tags: ['building'],
  set: 'corporate',
  desc,
  flavor: 'Taking advantage of dense population centers',
  production: {
    power: -1,
    megacredit: 4
  },
  tile: {
    special: 'euro'
  },
  vp: (player, game) =>
    game
      .neighbors(game.cardTile(player, card))
      .filter(t => t.type === 'city' || t.type === 'capital city').length,
  emoji: '🛍',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="power" />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <MegaCredit value="4" />
          </div>
        </Production>
        <div className="resources text-center">
          <Tile name="special" icon="euro" />
        </div>
      </div>
      <div className="col-3">
        <div className="description m-top">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/
            <Tile name="city" anyone asterisk />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});

export default card;
