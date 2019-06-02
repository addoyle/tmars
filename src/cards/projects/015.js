import React from 'react';
import Active from '../../components/Active';
import Resource from '../../components/assets/Resource';
import Production from '../../components/assets/Production';

const top_desc = 'Action: Decrease your Energy production 1 step to increase your terraform rating 1 step.';

export default new Active({
  number: 15,
  title: 'Equatorial Magnetizer',
  cost: 11,
  tags: ['building'],
  top_desc,
  flavor: 'Super-conducting wires enircling the globe to create a magnetic field',
  clientAction: game => {},
  serverAction: game => {},
  clientActiveAction: game => {},
  serverActiveAction: game => {},
  emoji: '🧲',
  activeLayout: (
    <div>
      <div className="center text-center">
        <div className="resources">
          <Production><div className="flex"><div>&ndash;</div><Resource name="power" /></div></Production> <span className="arrow" /> <Resource name="tr" />
        </div>
        <div className="description text-center">{top_desc}</div>
      </div>
    </div>
  ),
  layout: (
    <div className="m-top m-bottom" />
  )
});
