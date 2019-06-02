import React from 'react';
import Automated from '../../components/Automated';
import MegaCredit from '../../components/assets/MegaCredit';
import Tile from '../../components/assets/Tile';
import Resource from '../../components/assets/Resource';
import Production from '../../components/assets/Production';

const desc = 'Place an ocean tile. Decrease your M€ prodution 2 steps and increase your heat production 3 steps.';

export default new Automated({
  number: 22,
  title: 'Black Polar Dust',
  cost: 15,
  tags: [],
  desc,
  flavor: 'The sprinkled dust absorbs heat from the sun. Must be renewed after each snowfall, though',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🌫',
  layout: (
    <div className="flex">
      <div className="col-1">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <MegaCredit value="2" />
            <Resource name="blank" />
            <Resource name="blank" />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <Resource name="heat" />
            <Resource name="heat" />
            <Resource name="heat" />
          </div>
        </Production>
      </div>
      <div className="col-1">
        <div className="resources"><Tile name="ocean" /></div>
        <div className="description">{desc}</div>
      </div>
    </div>
  )
});
