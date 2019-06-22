import React from 'react';
import Corporation from '../../client/components/Corporation';
import { MegaCredit, Resource, Tile, Production } from '../../client/components/assets/Assets';

const desc = 'You start with 2 plant production, 3 plants, and 36 M€.';
const effectDesc = 'Effect: You may always pay 7 plants, instead of 8, to place 1 greenery.';

export default new Corporation({
  title: 'Ecoline',
  titleStyle: {
    fontSize: '.11em',
    textTransform: 'uppercase',
    color: '#72d22d',
    '-webkit-text-stroke': '.05em #000',
    letterSpacing: '.2em',
    margin: '.4em'
  },
  starting: {
    mc: 36,
    resources: {
      plant: 3
    },
    production: {
      plant: 2
    }
  },
  tags: ['plant'],
  desc,
  effectDesc,
  flavor: 'Having developed a fast-growing lichen suitable for early terraforming, this corporation\'s ambition is to lead the taming of the planets, despite its relatively small size.',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <div className="text-center">
          <Production>
            <div className="flex">
              <Resource name="plant" />
              <Resource name="plant" />
            </div>
          </Production>
        </div>
        <div className="resources text-center">
          <Resource name="plant" />
          <Resource name="plant" />
          <Resource name="plant" />
          <MegaCredit value="36" />
        </div>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-1 middle">
        <div className="effect">
          <div className="effect-title">Effect</div>
          <div className="resources">
            <span>7</span>
            <Resource name="plant" />
            <span className="arrow" />
            <Tile name="greenery" oxygen />
          </div>
          <div className="description">{effectDesc}</div>
        </div>
      </div>
    </div>
  )
});
