import React from 'react';
import Active from '../Active';
import {
  Tag,
  Param,
  VictoryPoint,
  Resource
} from '../../client/game/components/assets/Assets';

const activeDesc =
  'Effect: When you play a science tag, including this, you may discard a card from hand to draw a card.';

export default new Active({
  number: 73,
  title: 'Mars University',
  cost: 8,
  tags: ['science', 'building'],
  set: 'corporate',
  activeDesc,
  flavor: 'A major step towards understanding Mars',
  clientAction: () => {},
  serverAction: () => {},
  vp: 1,
  emoji: '🎓',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Tag name="science" />
        :&ndash;
        <Param name="card back" />
        <Resource name="blank" />
        +<Param name="card back" />
      </div>
      <div className="description text-center">{activeDesc}</div>
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
