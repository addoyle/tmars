import React from 'react';
import Active from '../../client/components/Active';
import { Param, Tile, VictoryPoint } from '../../client/components/assets/Assets';
import Restriction from '../../client/components/assets/Restriction';

const top_desc = 'Effect: Your global requirements are +2 or -2 steps, your choice in each case';

export default new Active({
  number: 153,
  title: 'Adaptation Technology',
  cost: 12,
  tags: ['science'],
  top_desc,
  flavor: 'Pushing the limits of the possible',
  clientAction: game => {},
  serverAction: game => {},
  vp: 1,
  emoji: '🥽',
  activeLayout: (
    <div>
      <div className="flex center resources">
        <Restriction values={[
            { param: 'oxygen' },
            { text: '/' },
            { tile: 'ocean' },
            { text: '/' },
            { param: 'temperature' }
          ]} />
        <span className="middle">:+/-2</span>
      </div>
      <div className="description text-center m-top">{top_desc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-3" />
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
