import React from 'react';
import Automated from '../Automated';
import {
  Resource,
  Tile,
  Production,
  MegaCredit
} from '../../../client/game/components/assets/Assets';

const desc =
  'Decrease your energy production 1 step and increase your M€ 3 steps. Place a city tile ON THE RESERVED AREA, disregarding normal placement restrictions.';

export default new Automated({
  number: 17,
  title: 'Noctis City',
  cost: 18,
  tags: ['city', 'building'],
  desc,
  flavor: 'In Noctis Labyrinthus, where the mist is gray',
  action: (player, game, done) => {
    game.production(player, 'power', -1);
    game.production(player, 'megacredit', 3);
    // TODO: Figure out special placement rules
    game.promptTile(player, 'city', done);
  },
  emoji: '🌆',
  layout: (
    <div>
      <div className="flex gutter">
        <div className="col-1">
          <Production>
            <div className="flex">
              <div className="col-1">&ndash;</div>
              <Resource name="power" />
            </div>
            <div className="flex">
              <div className="col-1">+</div>
              <MegaCredit value="3" />
            </div>
          </Production>
        </div>
        <div className="col-3 m-top">
          <div className="description">{desc}</div>
        </div>
      </div>
      <div className="resources">
        <Tile name="city" asterisk />
      </div>
    </div>
  )
});
