import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource,
  Tile
} from '../../../client/game/components/assets/Assets';

const desc =
  'Place this tile on an area with a steel or titanium placement bonus, adjacent to another of your tiles. Increase your production of that resource 1 step.';

export default new Automated({
  number: 64,
  title: 'Mining Area',
  cost: 4,
  tags: ['building'],
  set: 'corporate',
  desc,
  flavor:
    'It is easier to claim territories where you already have established activities',
  action: () => {},
  emoji: '🕳️',
  layout: (
    <div className="flex gutter">
      <div className="col-3 middle">
        <div className="flex center">
          <div className="resources">
            <Tile name="special" icon="mine" asterisk />
          </div>
          <div>
            <Production>
              <div className="flex">
                <div>
                  <Resource name="steel" />
                  <span>&nbsp;OR&nbsp;</span>
                  <Resource name="titanium" />
                </div>
              </div>
            </Production>
          </div>
          <div className="resources">*</div>
        </div>
        <div className="description text-center">{desc}</div>
      </div>
    </div>
  )
});
