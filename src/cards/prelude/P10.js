import React from 'react';
import Prelude from '../Prelude';
import {
  Resource,
  Production
} from '../../client/game/components/assets/Assets';

const desc = 'Increase your plant production 1 step.';

export default new Prelude({
  number: 'P10',
  title: 'Ecology Experts',
  tags: ['plant', 'microbe'],
  set: 'prelude',
  desc,
  flavor: 'I had no idea that you could actually do that',
  emoji: '♻️',
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
