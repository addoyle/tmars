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
  action: (player, game, done) => {
    // TODO: Figure out how to skip global requirements
    game.promptCard(player, done);

    // Set modifier to some high number as to bypass any checks
    const req = player.rates.requirement;
    req.temperature = (req.temperature || 0) + 100;
    req.oxygen = (req.temperature || 0) + 100;
    req.ocean = (req.ocean || 0) + 100;
    req.venus = (req.venus || 0) + 100;

    // Add a flag to keep track of if the card has been played
    player.cards.prelude.find(
      c => c.card === this.number
    ).nextCardPlayed = false;
  },
  events: {
    onCardPlayed: player => {
      const card = player.cards.event.find(c => c.card === this.number);

      if (!card.nextCardPlayed) {
        const req = player.rates.requirement;
        req.temperature = (req.temperature || 0) - 100;
        req.oxygen = (req.temperature || 0) - 100;
        req.ocean = (req.ocean || 0) - 100;
        req.venus = (req.venus || 0) - 100;

        card.nextCardPlayed = true;
      }
    }
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
