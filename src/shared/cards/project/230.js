import React from 'react';
import Automated from '../Automated';
import {
  Resource,
  Production,
  MegaCredit,
  Tag,
  Tile
} from '../../../client/game/components/assets/Assets';

const desc =
  'Decrease your energy production 2 steps. Increase your M€ production 1 step for each Venus and Earth tag you have. Place a city tile.';

export default new Automated({
  number: '230',
  title: 'Gyropolis',
  cost: 20,
  tags: ['city', 'building'],
  set: 'venus',
  desc,
  flavor:
    'A rotating city, creating 1G at the perimeter. Perfect for people returning to Earth or Venus',
  action: (player, game, done) => {
    game.production(player, 'power', -2);
    game.production(
      player,
      'megacredit',
      player.tags.venus + player.tags.earth
    );
    game.promptTile(player, 'city', done);
  },
  canPlay: (player, game) => {
    if (player.production.power < 2) {
      return {
        valid: false,
        msg: 'Not enough power production'
      };
    }

    const valid = !!game.findPossibleTiles('city', player).length;
    return {
      valid,
      msg: !valid ? 'Cannot place city tile' : null
    };
  },
  emoji: '💫',
  layout: (
    <div className="flex gutter">
      <div className="middle">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="power" />
            <Resource name="power" />/
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <div>
              <MegaCredit value="1" />/<Tag name="venus" />
            </div>
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <div>
              <MegaCredit value="1" />/<Tag name="earth" />
            </div>
          </div>
        </Production>
      </div>
      <div className="col-1 middle">
        <div className="resources">
          <Tile name="city" />
        </div>
        <div className="description middle">{desc}</div>
      </div>
    </div>
  )
});
