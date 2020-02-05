import React from 'react';
import Automated from '../Automated';
import { Production, Resource, Tile } from '../../client/components/assets/Assets';

const desc = 'Place this tile on an area with a steel or titanium placement bonus. Increase your production of that resource 1 step.';

export default new Automated({
  number: 67,
  title: 'Mining Rights',
  cost: 9,
  tags: ['building'],
  desc,
  flavor: 'The battles for Martian riches sometimes begin in a courtroom',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '⚖',
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
