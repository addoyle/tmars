import React from 'react';
import Corporation from '../Corporation';
import {
  MegaCredit,
  Param
} from '../../../client/game/components/assets/Assets';
import Restriction from '../../../client/game/components/assets/Restriction';

const desc =
  'As your first action in the game, draw 3 cards. Start with 45 M€.';
const effectDesc =
  'Effect: Your temperature, oxygen, and ocean requirements are +2 or -2 steps, your choice in each case.';

export default new Corporation({
  number: '006',
  title: 'Inventrix',
  titleClass: 'inventrix',
  starting: {
    resources: {
      megacredit: 45
    }
  },
  firstAction: () => {},
  tags: ['science'],
  desc,
  effectDesc,
  todo: true,
  flavor:
    "Inventrix uses brains, as well as muscle, when competing with other mega-corps. Its motto being: 'Do it right,' Inventrix is focused on research.",
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
            <div className="flex" style={{ marginTop: '.2em' }}>
              <div className="resources middle">
                <Restriction
                  values={[
                    { param: 'temperature' },
                    { param: 'oxygen' },
                    { tile: 'ocean' }
                  ]}
                />
              </div>
              <div className="resources middle">: +/- 2</div>
            </div>
          </div>
          <div className="description m-top">{effectDesc}</div>
        </div>
      </div>
    </div>
  )
});
