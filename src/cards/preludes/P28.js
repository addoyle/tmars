import React from 'react';
import Prelude from '../Prelude';
import { MegaCredit, Production, Param } from '../../client/components/assets/Assets';

const desc = 'Draw 3 ards, and increase your M€ production 1 step. After being played, when you perform an action, the wild-tag is any tag of your choice.';

export default new Prelude({
  number: 'P28',
  title: 'Research Network',
  tags: ['any'],
  set: 'prelude',
  desc,
  flavor: 'Having the right conncections for every scientific problem',
  emoji: '💻',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <div className="resources">
          <span>3</span><Param name="card back" />
        </div>
      </div>
      <div className="col-1 middle">
        <Production>
          <div className="flex">
            <MegaCredit value="1" />
          </div>
        </Production>
      </div>
      <div className="description col-4 middle">{desc}</div>
    </div>
  )
});
