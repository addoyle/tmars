import React from 'react';
import Prelude from '../Prelude';
import {
  Param,
  Production,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc = 'Increase your titanium production 1 step. Draw 1 card.';

export default new Prelude({
  number: 'P16',
  title: 'IO Research Outpost',
  tags: ['science', 'jovian'],
  set: 'prelude',
  desc,
  flavor: 'Exploring the most volcanic place in the solar system',
  emoji: '⛺',
  drawCard: 1,
  production: {
    titanium: 1
  },
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <Resource name="titanium" />
          </div>
        </Production>
      </div>
      <div className="col-1 middle">
        <div className="resources">
          <Param name="card back" />
        </div>
      </div>
      <div className="col-4 middle description">{desc}</div>
    </div>
  )
});
