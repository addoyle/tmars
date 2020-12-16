import React from 'react';
import Event from '../Event';
import { Resource } from '../../../client/game/components/assets/Assets';

const desc =
  'Raise your TR 1 step and gain 4 plants. Add 3 microbes to ANOTHER card and 2 animals to ANOTHER card.';

export default new Event({
  number: 163,
  title: 'Imported Nitrogen',
  cost: 23,
  tags: ['earth', 'space', 'event'],
  desc,
  flavor: 'Providing nitrogen needed in the atmosphere and for biomass',
  action: (player, game) => {
    game.tr(player, 1);
    game.resources(player, 'plant', 4);

    // TODO add animals and microbes to other cards
  },
  emoji: '🍾',
  todo: true,
  layout: (
    <div className="text-center">
      <div className="flex gutter">
        <div className="resources middle">
          <Resource name="tr" />
        </div>
        <div className="resources middle">
          <span>4</span>
          <Resource name="plant" />
          <span> 3</span>
          <Resource name="microbe" />
          <span>* 2</span>
          <Resource name="animal" />
          <span>*</span>
        </div>
      </div>
      <div className="description text-center m-top">{desc}</div>
    </div>
  )
});
