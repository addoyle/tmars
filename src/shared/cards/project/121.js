import React from 'react';
import Event from '../Event';
import {
  MegaCredit,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc = 'Remove up to 3 titanium from any player, or 4 steel, or 7 M€.';

export default new Event({
  number: '121',
  title: 'Sabotage',
  cost: 1,
  tags: ['event'],
  set: 'corporate',
  desc,
  flavor: 'Nobody will know who did it',
  action: (player, game, done) =>
    game.promptPlayer(
      player,
      'Pick a player to steal up to 3 titanium, 4 steel, or 7 M€',
      [
        p => ({ text: +p.resources.titanium }),
        { resource: 'titanium' },
        { text: '/' },
        p => ({ text: +p.resources.steel }),
        { resource: 'steel' },
        { text: '/' },
        p => ({ megacredit: +p.resources.megacredit })
      ],
      null,
      targetPlayer =>
        game.promptChoice(player, 'Steal up to 3 titanium, 4 steel, or 7 M€', [
          {
            icon: { player: targetPlayer.number },
            rightIcon: [{ text: -3 }, { resource: 'titanium' }],
            label: 'Steal titanium',
            disabled: targetPlayer.resources.titanium < 3,
            logSnippet: [
              'stole 3 titanium ',
              { resource: 'titanium' },
              ' from ',
              { player: targetPlayer.number }
            ],
            action: (p, game) => {
              const cur = targetPlayer.resources.titanium;
              game.resources(targetPlayer, 'titanium', -3);
              const diff = cur - targetPlayer.resources.titanium;
              game.resources(player, 'titanium', diff);
              done();
            }
          },
          {
            icon: { player: targetPlayer.number },
            rightIcon: [{ text: -4 }, { resource: 'steel' }],
            label: 'Steal steel',
            disabled: targetPlayer.resources.steel < 4,
            logSnippet: [
              'stole 4 steel ',
              { resource: 'steel' },
              ' from ',
              { player: targetPlayer.number }
            ],
            action: (p, game) => {
              const cur = targetPlayer.resources.steel;
              game.resources(targetPlayer, 'steel', -4);
              const diff = cur - targetPlayer.resources.steel;
              game.resources(player, 'steel', diff);
              done();
            }
          },
          {
            icon: { player: targetPlayer.number },
            rightIcon: [{ megacredit: -7 }],
            label: 'Steal M€',
            disabled: targetPlayer.resources.megacredit < 7,
            logSnippet: [
              'stole 7 M€ ',
              { megacredit: null },
              ' from ',
              { player: targetPlayer.number }
            ],
            action: (p, game) => {
              const cur = targetPlayer.resources.megacredit;
              game.resources(targetPlayer, 'megacredit', -7);
              const diff = cur - targetPlayer.resources.megacredit;
              game.resources(player, 'megacredit', diff);
              done();
            }
          }
        ]),
      p =>
        p.number !== player.number &&
        (p.resources.titanium > 0 ||
          p.resources.steel > 0 ||
          p.resources.megacredit > 0),
      done
    ),
  emoji: '🏴‍☠️',
  layout: (
    <div className="text-center">
      <div className="resources">
        <span>-3</span>
        <Resource name="titanium" anyone />
        <span>&nbsp; OR -4</span>
        <Resource name="steel" anyone />
        <span>&nbsp; OR </span>
        <MegaCredit value="-7" anyone />
      </div>
      <div className="description text-center m-top">{desc}</div>
    </div>
  )
});
