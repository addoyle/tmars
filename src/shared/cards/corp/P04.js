import React from 'react';
import Corporation from '../Corporation';
import {
  MegaCredit,
  Tag,
  Param
} from '../../../client/game/components/assets/Assets';

const desc =
  'You start with 37 M€. As your first action, draw 3 Prelude cards, and play one of them. Discard the other two.';
const effectDesc =
  'Effect: When you play a science tag, you pay 2 M€ less for it.';

export default new Corporation({
  number: 'P04',
  title: 'Valley Trust',
  titleClass: 'valley-trust',
  starting: {
    resources: {
      megacredit: 37
    }
  },
  tags: ['earth'],
  set: 'prelude',
  desc,
  effectDesc,
  flavor:
    'A community of technological entrepreneurs join forces to invest in space exploration',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <div className="flex gutter">
          <div className="col-1 resources text-center middle">
            <MegaCredit value="37" />
          </div>
          <div className="col-1 resources text-center middle">
            <Param name="card prelude landscape" />*
          </div>
        </div>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-1 middle">
        <div className="effect">
          <div className="effect-title m-bottom">Effect</div>
          <div className="resources">
            <Tag name="science" />:<MegaCredit value="-2" />
          </div>
          <div className="description m-top m-bottom">{effectDesc}</div>
        </div>
      </div>
    </div>
  )
});
