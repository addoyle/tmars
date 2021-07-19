import React from 'react';
import Automated from '../Automated';
import {
  Param,
  Resource,
  Tag
} from '../../../client/game/components/assets/Assets';

const desc =
  'Draw 1 card. Choose 1 of your played cards and add 1 microbe to it for each science tag you have, including this.';

export default new Automated({
  number: 'X35',
  title: 'Bactoviral Research',
  cost: 10,
  tags: ['microbe', 'science'],
  set: 'promo',
  desc,
  flavor: 'Developing a gene and cell design for microorganisms',
  resources: {
    microbe: player => player.tags.science
  },
  drawCard: 1,
  emoji: '🦠',
  todo: true,
  layout: (
    <div className="flex">
      <div className="col-2 middle text-center">
        <div className="resources">
          <Param name="card back" />
        </div>
        <div className="resources">
          <Resource name="microbe" />
          */
          <Tag name="science" />
        </div>
      </div>
      <div className="col-3 description middle">{desc}</div>
    </div>
  )
});
