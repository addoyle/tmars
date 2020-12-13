import React from 'react';
import Active from '../Active';
import {
  MegaCredit,
  Resource,
  Tile
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Spend 8 M€ to place 1 ocean tile. STEEL MAY BE USED as if you were playing a building card.';

export default new Active({
  number: 187,
  title: 'Aquifer Pumping',
  cost: 18,
  tags: ['building'],
  activeDesc,
  flavor:
    'Underground water reservoirs may be tapped in a controlled manner, to safely build up oceans to the desired level',
  action: () => {},
  emoji: '🌊',
  todo: true,
  activeLayout: (
    <div>
      <div className="resources text-center">
        <MegaCredit value="8" />
        <span className="sup">
          (<Resource name="steel" />)
        </span>
        <span className="arrow" />
        <Tile name="ocean" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div />
});
