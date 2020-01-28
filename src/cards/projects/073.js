import React from 'react';
import Active from '../../client/components/cards/Active';
import { Tag, Param, VictoryPoint, Resource } from '../../client/components/assets/Assets';

const top_desc = 'Effect: When you play a science tag, including this, you may discard a card from hand to draw a card.';

export default new Active({
  number: 73,
  title: 'Mars University',
  cost: 8,
  tags: ['science', 'building'],
  set: 'corporate',
  top_desc,
  flavor: 'A major step towards understanding Mars',
  clientAction: game => {},
  serverAction: game => {},
  vp: 1,
  emoji: '🎓',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Tag name="science" />:&ndash;<Param name="card back" />
        <Resource name="blank" />
        +<Param name="card back" />
      </div>
      <div className="description text-center">{top_desc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-3"></div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
