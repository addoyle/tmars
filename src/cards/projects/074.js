import React from 'react';
import Active from '../../client/components/Active';
import { Resource, Tag } from '../../client/components/assets/Assets';

const top_desc = 'Effect: When you play a plant, microbe, or an animal tag, including this, gain 1 plant or add 1 resource TO THAT CARD.';

export default new Active({
  number: 74,
  title: 'Viral Enhancers',
  cost: 9,
  tags: ['science', 'microbe'],
  set: 'corporate',
  top_desc,
  flavor: 'Genetically engineered virus strains can be used to introduce favorable genes in other organisms',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🦠',
  activeLayout: (
    <div>
      <div className="resources text-center condense">
        <Tag name="plant" /><span>/</span><Tag name="microbe" /><span>/</span><Tag name="animal" />
        &nbsp;:&nbsp;
        <Resource name="plant" /><span>/</span><Resource name="microbe" />*<span>/</span><Resource name="animal" />*
      </div>
      <div className="description text-center">{top_desc}</div>
    </div>
  ),
  layout: (
    <div className="m-top"/>
  )
});
