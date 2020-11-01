import React from 'react';
import Event from '../Event';
import {
  Param,
  Resource,
  Tile,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  'Place an ocean tile and draw 2 cards. Gain 5 plants, or add 4 animals to ANOTHER card.';

export default new Event({
  number: 143,
  title: 'Large Convoy',
  cost: 36,
  tags: ['earth', 'space', 'event'],
  desc,
  flavor: 'Huge delivery from Earth',
  action: () => {},
  vp: 2,
  emoji: '📦',
  layout: (
    <div className="text-center">
      <div className="resources text-center">
        <Tile name="ocean" />
        <Param name="card back" />
        <Param name="card back" />
        <span>5</span>
        <Resource name="plant" />
        <span>/4</span>
        <Resource name="animal" />*
      </div>

      <div className="flex gutter">
        <div className="col-3 description text-center middle">{desc}</div>
        <div className="col-1 bottom">
          <VictoryPoint>
            <span className="big point">2</span>
          </VictoryPoint>
        </div>
      </div>
    </div>
  )
});
