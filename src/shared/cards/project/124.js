import React from 'react';
import Event from '../Event';
import {
  MegaCredit,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc = 'Steal up to 2 steel, or 3 M€ from any other player.';

export default new Event({
  number: '124',
  title: 'Hired Raiders',
  cost: 1,
  tags: ['event'],
  set: 'corporate',
  desc,
  flavor: 'We have a better use for those resources',
  action: (player, game, done) =>
    game.promptPlayer(
      player,
      'Pick a player to steal up to 2 steel or 3 M€',
      [
        p => ({ text: +p.resources.steel }),
        { resource: 'steel' },
        { text: '/' },
        p => ({ megacredit: +p.resources.megacredit })
      ],
      null,
      targetPlayer =>
        game.promptChoice(player, 'Steal up to 2 steel or 3 M€', [
          {
            icon: { player: targetPlayer.number },
            rightIcon: [{ text: -2 }, { resource: 'steel' }],
            label: 'Steal steel',
            disabled: targetPlayer.resources.steel < 2,
            logSnippet: [
              'stole 2 steel ',
              { resource: 'steel' },
              ' from ',
              { player: targetPlayer.number }
            ],
            action: (p, game) => {
              const cur = targetPlayer.resources.steel;
              game.resources(targetPlayer, 'steel', -2);
              const diff = cur - targetPlayer.resources.steel;
              game.resources(player, 'steel', diff);
              done();
            }
          },
          {
            icon: { player: targetPlayer.number },
            rightIcon: [{ megacredit: -3 }],
            label: 'Steal M€',
            disabled: targetPlayer.resources.megacredit < 3,
            logSnippet: [
              'stole 3 M€ ',
              { megacredit: null },
              ' from ',
              { player: targetPlayer.number }
            ],
            action: (p, game) => {
              const cur = targetPlayer.resources.megacredit;
              game.resources(targetPlayer, 'megacredit', -3);
              const diff = cur - targetPlayer.resources.megacredit;
              game.resources(player, 'megacredit', diff);
              done();
            }
          }
        ]),
      p =>
        p.number !== player.number &&
        (p.resources.steel > 0 || p.resources.megacredit > 0),
      done
    ),
  emoji: '🏴‍☠️',
  layout: (
    <div className="text-center">
      <div className="flex gutter">
        <div className="col-2 text-right">
          <div className="resources">
            <span>STEAL 2</span>
          </div>
        </div>
        <div className="col-1 text-left">
          <div className="resources">
            <Resource name="titanium" anyone />
          </div>
        </div>
      </div>
      <div className="flex gutter">
        <div className="col-2 text-right">
          <div className="resources">
            <span>OR STEAL</span>
          </div>
        </div>
        <div className="col-1 text-left">
          <div className="resources">
            <MegaCredit value="3" anyone />
          </div>
        </div>
      </div>
      <div className="description text-center m-top">{desc}</div>
    </div>
  )
});
