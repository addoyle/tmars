import React from 'react';
import Event from '../Event';
import Restriction from '../../../client/game/components/assets/Restriction';

const desc =
  'The next card you play this generation is +2 or -2 in global requirements, your choice.';

export default new Event({
  number: '206',
  title: 'Special Design',
  cost: 4,
  tags: ['science', 'event'],
  desc,
  flavor: 'If it isn’t feasible, then make it so',
  action: player => {
    const req = player.rates.requirement;
    req.temperature = (req.temperature || 0) + 2;
    req.oxygen = (req.temperature || 0) + 2;
    req.ocean = (req.ocean || 0) + 2;
    req.venus = (req.venus || 0) + 2;

    // Add a flag to keep track of if the card has been played
    player.cards.event.find(c => c.card === this.number).nextCardPlayed = false;
  },
  events: {
    onCardPlayed: player => {
      const card = player.cards.event.find(c => c.card === this.number);

      if (!card.nextCardPlayed) {
        const req = player.rates.requirement;
        req.temperature = (req.temperature || 0) - 2;
        req.oxygen = (req.temperature || 0) - 2;
        req.ocean = (req.ocean || 0) - 2;
        req.venus = (req.venus || 0) - 2;

        card.nextCardPlayed = true;
      }
    }
  },
  vp: -1,
  emoji: '📐',
  layout: (
    <div className="text-center">
      <div className="flex center resources">
        <Restriction
          values={[
            { param: 'oxygen' },
            { text: '/' },
            { tile: 'ocean' },
            { text: '/' },
            { param: 'temperature' }
          ]}
        />
        <span className="middle">:+/-2</span>
      </div>
      <div className="description m-bottom m-top">{desc}</div>
    </div>
  )
});
