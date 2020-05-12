import React from 'react';
import Automated from '../Automated';
import {
  VictoryPoint,
  Tag,
  Param
} from '../../../client/game/components/assets/Assets';

const desc = 'Draw 1 card, or draw 3 cards if you have at least 3 Venus tags.';

export default new Automated({
  number: 232,
  title: 'IO Sulphur Reasearch',
  cost: 17,
  tags: ['science', 'jovian'],
  set: 'venus',
  desc,
  flavor: 'Finding new uses for all the suphur coming out of the Venus venture',
  clientAction: () => {},
  serverAction: () => {},
  vp: 2,
  emoji: '🔬',
  layout: (
    <div className="m-top">
      <div className="resources text-center">
        <Param name="card back" />
        <span> OR </span>
        <Tag name="venus" style={{ marginRight: '-.5em', zIndex: 2 }} />
        <Tag name="venus" style={{ marginRight: '-.5em', zIndex: 1 }} />
        <Tag name="venus" />
        <span>:</span>
        <Param name="card back" style={{ marginRight: '-.5em' }} />
        <Param
          name="card back"
          style={{ marginRight: '-.5em', marginTop: '-.25em' }}
        />
        <Param name="card back" />
      </div>
      <div className="flex gutter">
        <div className="description middle text-center">{desc}</div>
        <div className="text-right bottom">
          <VictoryPoint>
            <span className="big point">2</span>
          </VictoryPoint>
        </div>
      </div>
    </div>
  )
});
