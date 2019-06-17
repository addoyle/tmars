import React from 'react';
import Corporation from '../../client/components/Corporation';
import { MegaCredit, Param, Resource } from '../../client/components/assets/Assets';

const desc = 'You start with 42 M€. INSTEAD OF PARTICIPATING IN THE FIRST RESEARCH PHASE, DRAW 10 CARDS FOR FREE.';

export default new Corporation({
  title: 'Beginner Corporation',
  starting: {
    mc: 42,
    cards: 10
  },
  tags: [],
  desc,
  flavor: 'This is a standard corporation, doing standard things. There are no special effects or actions to keep track of. This is a good corporation to start with if you are terraforming a planet for the first time.',
  layout: (
    <div>
      <div className="resources text-center">
        <MegaCredit value="42" />
        <Resource name="blank" />
        <span>10</span>
        <Param name="card back" />*
      </div>
      <div className="description text-center">{desc}</div>
    </div>
  )
});
