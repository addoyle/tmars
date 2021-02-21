import React from 'react';
import Event from '../Event';
import {
  MegaCredit,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  "Steal 3 M€ from a player that REMOVED YOUR RESOURCES OR DECREASED YOUR PRODUCTION this generation. Place this card face down in THAT PLAYER'S EVENT PILE.";

export default new Event({
  number: 'X06',
  title: 'Law Suit',
  cost: 2,
  tags: ['earth', 'event'],
  set: 'promo',
  desc,
  flavor: 'See you in court',
  action: (player, game, done) =>
    game.promptPlayer(
      player,
      'Pick a player to remove up to 3 M€',
      [p => ({ megacredit: p.resources.megacredit })],
      ['stole 3 M€ ', { megacredit: '3' }, ' from'],
      targetPlayer => {
        if (targetPlayer) {
          let diff = targetPlayer.resources.megacredit - 3;
          diff = diff < 0 ? 0 : diff;

          game.resources(player, 'megacredit', diff < 3 ? diff : 3);
          game.resources(targetPlayer, 'megacredit', -3);

          // Put in target player's events
          targetPlayer.cards.event.push({ card: 'X06' });
          targetPlayer.tags.event++;
        }
        done();
      }
      // TODO: filter players that took from you
      // player => player.tags.venus > 0
    ),
  vp: -1,
  emoji: '👨‍⚖️',
  todo: true,
  layout: (
    <div className="flex gutter">
      <div className="col-3 middle text-center">
        <div className="resources">
          <span>STEAL&nbsp;</span>
          <MegaCredit value="3" anyone />
          <span>*</span>
        </div>
        <div className="description m-top">{desc}</div>
      </div>
      <div className="col-1 flex bottom">
        <VictoryPoint anyone>
          <span className="big point">-1</span>
        </VictoryPoint>
        <span>*</span>
      </div>
    </div>
  )
});
