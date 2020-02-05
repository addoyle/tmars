import React from 'react';
import Corporation from '../../client/components/cards/Corporation';
import { MegaCredit, Tile, Param } from '../../client/components/assets/Assets';
import Restriction from '../../client/components/assets/Restriction';

const desc = 'As your first action in the game, draw 3 cards. Start with 45 M€.';
const effectDesc = 'Effect: Your temperature, oxygen, and ocean requirements are +2 or -2 steps, your choice in each case.';

export default new Corporation({
  number: 6,
  title: 'Inventrix',
  titleStyle: {
    fontSize: '.12em',
    textTransform: 'uppercase',
    margin: '.5em',
    fontFamily: 'serif'
  },
  starting: {
    resources: {
      mc: 45
    }
  },
  firstAction: game => {},
  tags: ['science'],
  desc,
  effectDesc,
  flavor: 'Inventrix uses brains, as well as muscle, when competing with other mega-corps. Its motto being: \'Do it right,\' Inventrix is focused on research.',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <div className="flex">
          <div className="resources middle center">
            <Param name="card back" />
            <Param name="card back" />
            <Param name="card back" />
          </div>
          <div className="resources middle center">
            <MegaCredit value="45" />
          </div>
        </div>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-1 middle">
        <div className="effect">
          <div className="effect-title">Effect</div>
          <div className="flex center">
            <div className="resources">
              <Restriction values={[{param: 'temperature'}, {param: 'oxygen'}, {tile: 'ocean'}]} />
            </div>
          </div>
          <div className="description">{effectDesc}</div>
        </div>
      </div>
    </div>
  )
});
