import React from 'react';
import Active from '../Active';
import {
  Resource,
  MegaCredit
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Effect: Each titanium you have is worth 1€ extra. Each steel you have is worth 1 M€ extra.';

export default new Active({
  number: '071',
  title: 'Advanced Alloys',
  cost: 9,
  tags: ['science'],
  set: 'corporate',
  activeDesc,
  flavor:
    'The latest advances in metallurgy give you an edge in the competition',
  action: player => {
    player.rates.titanium++;
    player.rates.steel++;
  },
  emoji: '🔩',
  activeLayout: (
    <div className="flex gutter">
      <div className="col-2">
        <div className="resources text-center">
          <Resource name="titanium" />
          :+
          <MegaCredit value="1" />
        </div>
        <div className="resources text-center">
          <Resource name="steel" />
          :+
          <MegaCredit value="1" />
        </div>
      </div>
      <div className="col-3 description middle text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div className="m-top" />
});
