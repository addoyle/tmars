import React from 'react';
import Active from '../Active';
import { VictoryPoint } from '../../../client/game/components/assets/Assets';
import Restriction from '../../../client/game/components/assets/Restriction';

const activeDesc =
  'Effect: Your global requirements are +2 or -2 steps, your choice in each case';

export default new Active({
  number: '153',
  title: 'Adaptation Technology',
  cost: 12,
  tags: ['science'],
  activeDesc,
  flavor: 'Pushing the limits of the possible',
  vp: 1,
  emoji: '🥽',
  action: player => {
    const req = player.rates.requirement;
    req.temperature = (req.temperature || 0) + 2;
    req.oxygen = (req.oxygen || 0) + 2;
    req.ocean = (req.ocean || 0) + 2;
    req.venus = (req.venus || 0) + 2;
  },
  activeLayout: (
    <div>
      <div className="flex center resources">
        <Restriction
          values={[
            { param: 'oxygen' },
            { text: '/' },
            { tile: 'ocean' },
            { text: '/' },
            { param: 'temperature' }
          ]}
        />
        <span className="middle">:+/-2</span>
      </div>
      <div className="description text-center m-top">{activeDesc}</div>
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
