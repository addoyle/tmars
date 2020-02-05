import React from 'react';
import Active from '../Active';
import { Param, Tag, Resource } from '../../client/components/assets/Assets';

const activeDesc = (<span>Action: Reveal and place a SPACE OR BUILDING card here from hand, and place 2 resources on it, OR double the resources on a card here.<br />Effect: Cards here may be played as if from hand with its cost reduced by the number of resources on it.</span>);
const desc = 'Requires 2 science tags.';

export default new Active({
  number: 210,
  title: 'Self-Replicating Robots',
  cost: 7,
  tags: ['science', 'building'],
  set: 'promo',
  restriction: {
    value: 2,
    tag: 'science'
  },
  activeDesc,
  flavor: '...self-replicating, self-replicating, self-replicating...',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🤖',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span className="arrow" />
        <Param name="card back" />
        <span className="sub" style={{
            marginLeft: '-1.8em',
            position: 'relative',
            zIndex: 1
          }}>
          <Resource name="marker" />
          <Resource name="marker" />
        </span>
        <span className="sup" style={{
            marginLeft: '-1.1em',
            position: 'relative',
            top: '-.6em',
            zIndex: 1
          }}>
          <Tag name="space" />
          <Tag name="building" />
        </span>
        <span> OR </span>
        <span className="arrow" />
        <span className="sub">
          <Resource name="marker" />
          <Resource name="marker" />
        </span>
        <span>x2</span>
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="description text-center">{desc}</div>
  )
});
