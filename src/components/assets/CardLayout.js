import React from 'react';

import VictoryPoint from './VictoryPoint';
import Tag from './Tag';
import Tile from './Tile';
import Resource from './Resource';
import Production from '../Production';
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
    <div className="col-1 middle text-center"><Param name="temperature" /></div>
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

// Martian Rails
7: (
  <div className="m-top m-bottom" />
),
'7_top': (
  <div>
    <div className="center text-center">
      <div className="resources">
        <Resource name="power" /> <span className="arrow" /> <MegaCredit value="1" /> / <Tile name="city" anyone />*
      </div>
      <div className="description text-center">{cards[7].top_desc}</div>
    </div>
  </div>
),

// Capital
8: (
  <div>
    <div className="gutter">
      <div className="description">{cards[8].desc}</div>
    </div>
    <div className="flex m-top">
      <div className="col-3">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="power" />
            <Resource name="power" />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <MegaCredit value="5" />
            <Resource name="blank" />
          </div>
        </Production>
        <div className="inline-block valign-top">
          <div className="resources" style={{verticalAlign: 'top'}}><Tile name="city capital" /></div>
        </div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/<Tile name="ocean" />*
          </span>
        </VictoryPoint>
      </div>
    </div>
  </div>
),

// Asteroid
9: (
  <div className="flex gutter m-top m-bottom">
    <div className="resources col-1">
      <div>+ <Param name="temperature" /> <Resource name="titanium" /> <Resource name="titanium" /></div>
      <div>&ndash; <Resource name="plant" anyone /> <Resource name="plant" anyone /> <Resource name="plant" anyone /></div>
    </div>
    <div className="description col-1">{cards[9].desc}</div>
  </div>
),

// Comet
10: (
  <div className="flex gutter m-top m-bottom">
    <div className="resources col-1">
      <div>+ <Param name="temperature" /> <Tile name="ocean" /></div>
      <div>&ndash; <Resource name="plant" anyone /> <Resource name="plant" anyone /> <Resource name="plant" anyone /></div>
    </div>
    <div className="description col-1">{cards[10].desc}</div>
  </div>
),

// Big Asteroid
11: (
  <div className="flex gutter m-top m-bottom">
    <div className="resources col-2">
      <div>+ &nbsp;<Param name="temperature" /> <Param name="temperature" /></div>
      <div>&ndash;4 <Resource name="plant" anyone /></div>
    </div>
    <div className="col-5">
      <div className="resources"><Resource name="titanium" /> <Resource name="titanium" /> <Resource name="titanium" /> <Resource name="titanium" /></div>
      <div className="description">{cards[11].desc}</div>
    </div>
  </div>
),

// Water Import From Europa
12: (
  <div class="flex">
    <div class="col-4 description middle">{cards[12].desc}</div>
    <div class="col-1 middle">
      <VictoryPoint>
        <span>
          <span className="point">1</span>/<Tag name="jovian" />
        </span>
      </VictoryPoint>
    </div>
  </div>
),
'12_top': (
  <div>
    <div className="center text-center">
      <div className="resources">
        <MegaCredit value="12" /><span class="sup"> (<Resource name="titanium" />)</span> <span className="arrow" /> <Tile name="ocean" />
      </div>
      <div className="description text-center">{cards[12].top_desc}</div>
    </div>
  </div>
)

};

export default function CardLayout(props) {
  return cardLayouts[props.card.number];
}
