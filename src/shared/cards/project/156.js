import React from 'react';
import Active from '../Active';
import { MegaCredit } from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Effect: After you pay for a standard project, except selling patents, you gain 3 M€.';

export default new Active({
  number: '156',
  title: 'Standard Technology',
  cost: 6,
  tags: ['science'],
  set: 'corporate',
  activeDesc,
  flavor: 'Standard solutions honed to perfection',
  emoji: '👨‍💻',
  events: {
    onStandardProject: (player, game, project) =>
      project.cost > 0 && game.resources(player, 'megacredit', 3)
  },
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span className="standard-project" style={{ whiteSpace: 'initial' }}>
          Standard projects
        </span>
        :
        <MegaCredit value="3" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div />
});
