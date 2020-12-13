import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource,
  Param
} from '../../../client/game/components/assets/Assets';

const desc =
  'Decrease your energy production 2 steps. Increase your steel production 2 steps and your titanium production 1 step. Raise oxygen 2 steps.';

export default new Automated({
  number: 138,
  title: 'Strip Mine',
  cost: 25,
  tags: ['building'],
  desc,
  flavor:
    'It is not exactly environmentally friendly to just dig up the surface, but it can be profitable',
  action: () => {},
  emoji: '👷',
  todo: true,
  layout: (
    <div className="text-center">
      <div className="flex gutter">
        <div className="col-1">
          <Production>
            <div className="flex">
              <div className="col-1">&ndash;</div>
              <Resource name="power" />
              <Resource name="power" />
              <Resource name="blank" />
            </div>
            <div className="flex">
              <div className="col-1">+</div>
              <Resource name="steel" />
              <Resource name="steel" />
              <Resource name="titanium" />
            </div>
          </Production>
        </div>
        <div className="middle col-1 text-center">
          <div className="resources">
            +<Param name="oxygen" />
            <Param name="oxygen" />
          </div>
        </div>
      </div>
      <div className="description">{desc}</div>
    </div>
  )
});
