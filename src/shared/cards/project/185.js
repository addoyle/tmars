import React from 'react';
import Active from '../Active';
import {
  Tag,
  Resource,
  Param,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'When you play a science tag, including this, either add a science resource to this card, or remove a science resource from this card to draw a card.';
const desc = 'Requires 2 ocean tiles.';

export default new Active({
  number: 185,
  title: 'Olympus Conference',
  cost: 10,
  tags: ['science', 'earth', 'building'],
  set: 'corporate',
  activeDesc,
  desc,
  flavor:
    'The scientific elite, assembled on the top of Olympus Mons, the highest spot in the solar system',
  action: () => {},
  vp: 1,
  emoji: '💼',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Tag name="science" />:<Resource name="science" />
        <span> OR &ndash;</span>
        <Resource name="science" />
        <span>+</span>
        <Param name="card back" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-3" />
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
