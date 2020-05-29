import React from 'react';
import Corporation from '../Corporation';
import {
  MegaCredit,
  Param,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc =
  'You start with 42 M€. INSTEAD OF PARTICIPATING IN THE FIRST RESEARCH PHASE, DRAW 10 CARDS FOR FREE.';

export default new Corporation({
  number: 0,
  title: 'Beginner Corporation',
  titleStyle: {
    margin: '1.8em auto .8em',
    textTransform: 'uppercase',
    fontFamily: 'serif',
    fontSize: '.07em',
    border: '.1em solid #444',
    padding: '0.5em 1.3em',
    letterSpacing: '.1em',
    background:
      'linear-gradient(to right, #bbb 0%, #eee 25%, #bbb 50%, #bbb 75%, #eee 100%)',
    boxShadow:
      '.3em 0 0 #e69a00, .4em 0 0 #444, -.3em 0 0 #e69a00, -.4em 0 0 #444',
    borderRadius: '0 0 .75em .75em/0 0 100% 100%'
  },
  starting: {
    resources: { megacredit: 42 },
    cards: 10
  },
  tags: [],
  desc,
  flavor:
    'This is a standard corporation, doing standard things. There are no special effects or actions to keep track of. This is a good corporation to start with if you are terraforming a planet for the first time.',
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
