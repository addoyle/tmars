import React from 'react';
import Prelude from '../Prelude';
import {
  Resource,
  Production
} from '../../../client/game/components/assets/Assets';

const desc = 'Increase your plant production 1 step.';

export default new Prelude({
  number: 'P10',
  title: 'Ecology Experts',
  tags: ['plant', 'microbe'],
  set: 'prelude',
  desc,
  flavor: 'I had no idea that you could actually do that',
  emoji: '♻️',
  action: (player, game) => {
    // Set modifier to some high number as to bypass any checks
    const req = player.rates.requirement;
    req.temperature = (req.temperature || 0) + 100;
    req.oxygen = (req.temperature || 0) + 100;
    req.ocean = (req.ocean || 0) + 100;
    req.venus = (req.venus || 0) + 100;

    game.promptCard(player, {
      cards: 'hand',
      mode: 'play',
      action: player => {
        const req = player.rates.requirement;
        req.temperature -= 100;
        req.oxygen -= 100;
        req.ocean -= 100;
        req.venus -= 100;
      }
    });
  },
  production: {
    plant: 1
  },
  layout: (
    <div className="flex gutter">
      <div className="col-1 text-center middle">
        <Production>
          <div className="flex">
            <Resource name="plant" />
          </div>
        </Production>
        <div className="description">{desc}</div>
      </div>
      <div className="col-2 text-center middle">
        PLAY A CARD FROM HAND, IGNORING GLOBAL REQUIREMENTS
      </div>
    </div>
  )
});
