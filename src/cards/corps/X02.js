import React from 'react';
import Corporation from '../../client/components/cards/Corporation';
import { MegaCredit, Resource, Production, Param } from '../../client/components/assets/Assets';

const desc = 'You start with 37 M€. Increase your steel production 1 step.';
const effectDesc = 'Action: Increase your energy production 1 step IF YOU HAVE NO ENERGY RESOURCES, or spend 3 M€ to draw a building card.';

export default new Corporation({
  number: 'X02',
  title: 'Factorum',
  titleClass: 'factorum',
  starting: {
    mc: 37,
    production: {
      steel: 1
    }
  },
  tags: ['power', 'building'],
  set: 'promo',
  desc,
  effectDesc,
  flavor: 'When the Martian society grew, Factorum made its name as the dominant industrial conglomerate on the planet.',
  layout: (
    <div>
      <div className="flex gutter">
        <div className="col-2 bottom text-center">
          <div className="resources">
            <MegaCredit value="37" />
            <Production>
              <div className="flex">
                <Resource name="steel" />
              </div>
            </Production>
          </div>
          <div className="description">{desc}</div>
        </div>
        <div className="col-3 text-center">
          <div className="effect">
            <div className="effect-title">Action</div>
            <div className="table">
              <div className="row">
                <div className="cell middle resources text-center">
                  <div><span className="arrow" /></div>
                </div>
                <div className="cell middle resources text-center">
                  <Production>
                    <div className="flex">
                      <Resource name="power" />
                    </div>
                  </Production>
                </div>
                <div className="cell middle resources text-left">*</div>
                <div className="cell" />
              </div>
              <div className="row">
                <div className="cell middle resources text-center">
                  <span>OR</span>
                </div>
                <div className="cell middle resources">
                  <MegaCredit value="3" />
                </div>
                <div className="cell middle resources">
                  <div><span className="arrow" /></div>
                </div>
                <div className="cell middle resources">
                  <div><Param name="card back" tag="building" /></div>
                </div>
              </div>
            </div>
            <div className="description">{effectDesc}</div>
          </div>
        </div>
      </div>
    </div>
  )
});
