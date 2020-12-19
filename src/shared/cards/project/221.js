import React from 'react';
import Active from '../Active';
import {
  Resource,
  Production
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Add 1 floater to this card, or spend 1 floater here to increase your energy production 1 step..';

export default new Active({
  number: '221',
  title: 'Deuterium Export',
  cost: 11,
  tags: ['venus', 'power', 'space'],
  set: 'venus',
  activeDesc,
  flavor:
    'The D/H ratio on Venus is 100 times higher than on Earth, making it worthwile to extract and use on fusion power plants',
  action: () => {},
  emoji: '🛢️',
  todo: true,
  activeLayout: (
    <div>
      <div className="table center">
        <div className="row">
          <div className="cell middle"></div>
          <div className="cell middle resources">
            <span className="arrow" />
          </div>
          <div className="cell middle resources text-center">
            <Resource name="floater" />
          </div>
        </div>
        <div className="row">
          <div className="cell middle resources">
            <span>OR</span>
            <Resource name="floater" />
          </div>
          <div className="cell middle resources">
            <span className="arrow" />
          </div>
          <div className="cell middle resources text-center">
            <Production>
              <div className="flex">
                <Resource name="power" />
              </div>
            </Production>
          </div>
        </div>
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div />
});
