import React from 'react';
import Corporation from '../Corporation';
import { MegaCredit, Tag } from '../../../client/game/components/assets/Assets';

const desc = 'You start with 60 M€.';
const effectDesc =
  'Effect: When playing an Earth card, you pay 3 M€ less for it.';

export default new Corporation({
  number: 11,
  title: 'Teractor',
  titleStyle: {
    textTransform: 'uppercase',
    margin: '1em auto .5em',
    color: 'orange',
    '-webkit-text-stroke': '.04em #000',
    fontFamily: 'Papyrus, fantasy',
    letterSpacing: '.2em'
  },
  starting: {
    resource: {
      megacredit: 60
    }
  },
  tags: ['earth'],
  set: 'corporate',
  desc,
  effectDesc,
  flavor:
    'Influence enough to control entire nations, and an army of lawyers and businessmen, has taken Teractor all the way to the top. And now the sky is calling. The strongest corporation on Earth wants to dominate space too...',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <div className="flex">
          <div className="resources middle center">
            <MegaCredit value="60" />
          </div>
        </div>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-1 middle">
        <div className="effect">
          <div className="effect-title">Effect</div>
          <div className="flex center">
            <div className="resources">
              <Tag name="earth" /> : <MegaCredit value="-3" />
            </div>
          </div>
          <div className="description">{effectDesc}</div>
        </div>
      </div>
    </div>
  )
});
