import React from 'react';
import Automated from '../../components/Automated';
import Resource from '../../components/assets/Resource';
import Production from '../../components/assets/Production';
import VictoryPoint from '../../components/assets/VictoryPoint';
import Tile from '../../components/assets/Tile';

const desc = 'Increase your titanium production 1 step and place a city tile ON THE RESERVED AREA.';

export default new Automated({
  number: 21,
  title: 'Phobos Space Haven',
  cost: 25,
  tags: ['space', 'city'],
  desc,
  flavor: 'The doorway to Mars',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🍄',
  vp: 3,
  layout: (
    <div className="flex">
      <div className="col-4">
        <div className="resources text-center">
          <Production><Resource name="titanium" /></Production>
          <Resource name="blank" />
          <Tile name="city" asterisk />
        </div>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint><span className="big point">3</span></VictoryPoint>
      </div>
    </div>
  )
});
