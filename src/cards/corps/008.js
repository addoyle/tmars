import React from 'react';
import Corporation from '../../client/components/Corporation';
import { Production, MegaCredit, Tile } from '../../client/components/assets/Assets';

const desc = 'You start with 40 M€. As your first action in the game, place a city tile.';
const effectDesc = 'Effect: When any city tile is placed ON MARS, increase your M€ production 1 step. When you place a city tile, gain 3 M€.';

export default new Corporation({
  title: 'Tharsis Republic',
  titleStyle: {
    fontSize: '.07em',
    textTransform: 'uppercase',
    margin: '0.5em 1em -4em 1em',
    borderTop: '1em solid orange',
    transform: 'scale(1.2,1)',
    letterSpacing: '.1em',
    display: 'inline-block',
    width: '6em'
  },
  starting: {
    mc: 40
  },
  firstAction: game => {},
  tags: ['building'],
  desc,
  effectDesc,
  flavor: 'With the first big city came a social community that could not be controlled by the corporations. Determined to have an elected leader, workers and staff from all corporations formed Tharsis Republic.',
  layout: (
    <div className="flex gutter">
      <div className="col-1 bottom m-bottom">
        <div className="flex">
          <div className="resources middle center">
            <MegaCredit value="40" />
          </div>
          <div className="resources middle center">
            <Tile name="city" />
          </div>
        </div>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-1 middle">
        <div className="effect">
          <div className="effect-title">Effect</div>
          <div className="flex">
            <div className="resources">
              <Tile name="city" anyone asterisk /> :&nbsp;
            </div>
            <Production>
              <div className="flex">
                <MegaCredit value="1" />
              </div>
            </Production>
          </div>
          <div className="flex">
            <div className="resources">
              <Tile name="city" /> : <MegaCredit value="3" />
            </div>
          </div>
          <div className="description">{effectDesc}</div>
        </div>
      </div>
    </div>
  )
});
