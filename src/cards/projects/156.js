import React from 'react';
import Active from '../../client/components/Active';
import { MegaCredit } from '../../client/components/assets/Assets';

const top_desc = 'Effect: After you pay for a standard project, except selling patents, you gain 3 M€.';

export default new Active({
  number: 156,
  title: 'Standard Technology',
  cost: 6,
  tags: ['science'],
  set: 'corporate',
  top_desc,
  flavor: 'Standard solutions honed to perfection',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '👨‍💻',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span className="standard-project">Standard projects</span>:<MegaCredit value="3" />
      </div>
      <div className="description text-center">{top_desc}</div>
    </div>
  ),
  layout: (
    <div />
  )
});
