import React from 'react';
import Automated from '../Automated';
import {
  Production,
  MegaCredit,
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  'Decrease your enery production 1 step and any M€ production 2 steps. Increase your M€ production 2 steps.';

export default new Automated({
  number: '125',
  title: 'Hackers',
  cost: 3,
  tags: [],
  set: 'corporate',
  desc,
  flavor: 'Very unethical, very illegal, very lucrative',
  action: (player, game, done) => {
    game.promptPlayer(
      player,
      { production: 'megacredit' },
      ['took 2 M€ ', { megacredit: null }, ' production from'],
      targetPlayer => {
        game.production(player, 'power', -1);
        game.production(player, 'megacredit', 2);
        game.production(targetPlayer, 'megacredit', -2);
        done();
      }
    );
  },
  canPlay: (player, game) => {
    if (player.production.power < 1) {
      return {
        valid: false,
        msg: 'Not enough power production'
      };
    }

    // Check if ANYONE has M€ production > -5
    const valid = !!game.players.filter(p => p.production.megacredit > -5)
      .length;
    return {
      valid,
      msg: !valid
        ? 'Requires at least one player with -5 or more M€ production'
        : null
    };
  },
  vp: -1,
  emoji: '💻',
  layout: (
    <div className="flex gutter center">
      <div className="col-3 text-center">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="power" />
            <MegaCredit value="2" anyone />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <MegaCredit value="2" />
            <Resource name="blank" />
          </div>
        </Production>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">-1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
