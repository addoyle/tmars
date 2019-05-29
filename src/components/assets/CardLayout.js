import React from 'react';

import VictoryPoint from './VictoryPoint';
import Tag from './Tag';
import Tile from './Tile';
import Resource from './Resource';
import Production from './Production';
import MegaCredit from './MegaCredit';
import Param from './Param';
import cards from '../../cards/base.js';

const cardLayouts = {

// Colonizer Training Camp
1: (
  <div className="flex m-top">
    <div className="description col-3 text-center middle">{cards[1].desc}</div>
    <div className="col-1 middle">
      <VictoryPoint>
        <span className="point big">2</span>
      </VictoryPoint>
    </div>
  </div>
),

// Asteroid Mining Consortium
2: (
  <div className="flex gutter">
    <div className="col-2">
      <Production>
        <div className="flex">
          <div className="col-1">&ndash;</div>
          <Resource name="titanium" anyone />
        </div>
        <div className="flex">
          <div className="col-1">+</div>
          <Resource name="titanium" />
        </div>
      </Production>
    </div>
    <div className="col-3 description">{cards[2].desc}</div>
    <div className="col-2 bottom">
      <VictoryPoint>
        <span className="point big">1</span>
      </VictoryPoint>
    </div>
  </div>
),

// Deep Well Heating
3: (
  <div className="flex gutter m-top m-bottom">
    <div className="col-1 middle">
      <Production><Resource name="power" /></Production>
    </div>
    <div className="col-1 middle"><Param name="temperature" /></div>
    <div className="col-4 description middle">{cards[3].desc}</div>
  </div>
),

// Cloud Seeding
4: (
  <div className="flex gutter">
    <div className="col-2 middle">
      <Production>
        <div className="flex">
          <div className="col-1">&ndash;</div>
          <MegaCredit value="1" />
          <Resource name="heat" anyone />
        </div>
        <div className="flex">
          <div className="col-1">+</div>
          <Resource name="plant" />
          <Resource name="plant" />
        </div>
      </Production>
    </div>
    <div className="col-3 middle">{cards[4].desc}</div>
  </div>
),

// Search For Life
5: (
  <div className="flex m-top">
    <div className="col-4 description text-center middle">{cards[5].desc}</div>
    <div className="col-1 middle">
      <VictoryPoint>
        <span>
          <Resource name="science" />*: <span className="point">3</span>
        </span>
      </VictoryPoint>
    </div>
  </div>
),
'5_top': (
  <div>
    <div className="center text-center">
      <div className="resources">
        <MegaCredit value="1" /> <span className="arrow" /> <Tag name="microbe" />*: <Resource name="science" />
      </div>
      <div className="description text-center">{cards[5].top_desc}</div>
    </div>
  </div>
),

// Inventor's Guild
6: (
  <div className="m-top m-bottom" />
),
'6_top': (
  <div className="flex middle">
    <div className="col-1 resources"><div className="arrow" /></div>
    <div className="col-6">{cards[6].top_desc}</div>
  </div>
),
7: (
  <div className="m-top m-bottom" />
),
'7_top': (
  <div>
    <div className="center text-center">
      <div className="resources">
        <Resource name="power" /> <span className="arrow" /> <MegaCredit value="1" /> / <Tile name="city" />*
      </div>
      <div className="description text-center">{cards[7].top_desc}</div>
    </div>
  </div>
)

};

export default function CardLayout(props) {
  return cardLayouts[props.card.number];
}
