import React from 'react';
import Automated from '../../components/Automated';
import Tile from '../../components/assets/Tile';
import Resource from '../../components/assets/Resource';
import Production from '../../components/assets/Production';

const desc = 'Place a city tile. Decrease your energy production 2 steps and increase your steel production 2 steps.';

export default new Automated({
  number: 32,
  title: 'Underground City',
  cost: 18,
  tags: ['city', 'building'],
  desc,
  flavor: 'Excavating is expensive, but given both protection and building materials',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🚇',
  layout: (
    <div className="flex">
      <div className="col-2 middle">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="power" />
            <Resource name="power" />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <Resource name="steel" />
            <Resource name="steel" />
          </div>
        </Production>
      </div>
      <div className="col-3 middle">
        <div className="resources"><Tile name="city" /></div>
        <div className="description">{desc}</div>
      </div>
    </div>
  )
});