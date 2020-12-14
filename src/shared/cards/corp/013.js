import React from 'react';
import Corporation from '../Corporation';
import {
  MegaCredit,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc =
  'You start with 40 M€ and 10 steel. AS YOUR FIRST ACTION, PLACE A COMMUNITY (PLAYER MARKER) ON A NON-RESERVED AREA.';
const actionDesc =
  'ACTION: PLACE A COMMUNITY (PLAYER MARKER) ON A NON-RESERVED AREA ADJACENT TO ONE OF YOUR TILES OR MARKED AREAS.';
const effectDesc =
  'EFFECT: MARKED AREAS ARE RESERVED FOR YOU. WHEN YOU PLACE A TILE THERE, GAIN 3 M€.';

export default new Corporation({
  number: 13,
  title: 'Arcadian Communities',
  titleStyle: {
    fontSize: '.07em',
    textTransform: 'uppercase',
    margin: '.3em 0 -2.2em 1em',
    textAlign: 'center',
    background: 'linear-gradient(to right, #ccc 0%, #fff 50%, #ccc 100%)',
    border: '.05em solid black',
    boxShadow: '.5em .5em .5em rgba(0,0,0,.5)',
    width: '7em',
    borderRadius: '50% 50% 0 0 / 70% 70% 0 0',
    padding: '1em 0 0'
  },
  starting: {
    resources: {
      megacredit: 40,
      steel: 10
    }
  },
  firstAction: () => {},
  tags: [],
  set: 'promo',
  desc,
  actionDesc,
  effectDesc,
  todo: true,
  flavor:
    'Several early settlements came together in the Arcadian Communities. This ever expanding society is investing in terraforming their new home...',
  layout: (
    <div className="flex gutter">
      <div className="col-1 bottom">
        <div className="flex">
          <div className="resources middle center">
            <MegaCredit value="40" />
          </div>
          <div className="resources middle center">
            <span>10</span>
            <Resource name="steel" />
          </div>
          <div className="resources middle center">
            <Resource name="marker" />*
          </div>
        </div>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-1 middle">
        <div className="effect">
          <div className="effect-title">Action</div>
          <div>
            <div className="resources" style={{ float: 'left' }}>
              <span className="arrow" />
            </div>
            <div className="description">{actionDesc}</div>
          </div>
          <div className="effect-title m-top">Effect</div>
          <div className="description">{effectDesc}</div>
        </div>
      </div>
    </div>
  )
});
