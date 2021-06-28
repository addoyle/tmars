import React from 'react';
import Active from '../Active';
import {
  Resource,
  MegaCredit,
  Production
} from '../../../client/game/components/assets/Assets';

// TODO action

const activeDesc =
  'Action: Spend 1 M€ to add 1 asteroid to ANY card, OR spend 1 asteroid here to raise your M€ production 1 step or gain 2 titanium.';
const desc = 'Gain 2 asteroids to this card.';

const card = new Active({
  number: 'X34',
  title: 'Asteroid Rights',
  cost: 10,
  tags: ['earth', 'space'],
  set: 'promo',
  activeDesc,
  desc,
  resource: 'asteroid',
  flavor:
    'Acquiring the rights to several asteroids that you can lease to miners, or mine yourself',
  cardResource: 2,
  actions: [
    {
      name: 'Add 1 Asteroid',
      icon: (
        <>
          <MegaCredit value="1" />
          <span className="arrow" />
          <Resource name="asteroid" />*
        </>
      ),
      resources: { megacredit: -1 },
      action: (player, game, done) => {
        // TODO
        console.log(done);
      }
    },
    {
      name: 'Raise M€ Production',
      icon: (
        <>
          <Resource name="asteroid" />
          <span className="arrow" />
          <Production>
            <div className="flex">
              <MegaCredit value="1" />
            </div>
          </Production>
        </>
      ),
      cardResource: -1,
      production: { megacredit: 1 }
    },
    {
      name: 'Gain 2 Titanium',
      icon: (
        <>
          <Resource name="asteroid" />
          <span className="arrow" />
          <Resource name="titanium" />
          <Resource name="titanium" />
        </>
      ),
      cardResource: -1,
      resource: { titanium: 2 }
    }
  ],
  vp: 1,
  emoji: '🚩',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <MegaCredit value="1" />
        <span className="arrow" />
        <Resource name="asteroid" />*
      </div>
      <div className="resources text-center">
        <Resource name="asteroid" />
        <span className="arrow" />
        <Production>
          <div className="flex">
            <MegaCredit value="1" />
          </div>
        </Production>
        <span> OR </span>
        <Resource name="titanium" />
        <Resource name="titanium" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-1">
        <div className="resources">
          <Resource name="asteroid" />
          <Resource name="asteroid" />
        </div>
      </div>
      <div className="col-3 description middle text-center">{desc}</div>
    </div>
  )
});

export default card;
