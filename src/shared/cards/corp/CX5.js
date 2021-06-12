import React from 'react';
import Corporation from '../Corporation';
import {
  MegaCredit,
  Resource,
  Param,
  Tag
} from '../../../client/game/components/assets/Assets';

const desc = 'You start with 54 M€. Draw a science card.';
const effectDesc =
  'Effect: When ANY microbe tag is played, including these 2, add a disease here and lose 4 M€ or as much as possible. When you play a science tag, remove 1 disease from here and raise your TR 1 step, OR, if there are no dieases here, you may raise TR 3 steps and place this card in your event pile. It now counts as a played event.';

export default new Corporation({
  number: 'CX5',
  title: 'Pharmacy Union',
  titleClass: 'pharmacy',
  resources: { megacredit: 54 },
  starting: (player, game) =>
    game.players
      .filter(p => p.number !== player.number)
      .forEach(p => game.production(p, 'megacredit', -2)),
  tags: ['microbe', 'microbe'],
  set: 'promo',
  desc,
  resource: 'disease',
  effectDesc,
  events: {
    losesResources: (player, game, victim) => {
      const amt = Math.min(3, player.resources.megacredit);
      game.resources(player, 'megacredit', -amt);
      game.resources(victim, 'megacredit', amt);
    }
  },
  flavor:
    'Responsible for Martian health care, the Pharmacy Union deploys their disease-fighting team to battle against deadly viruses. They hope to one day develop a universal health care',
  layout: (
    <div>
      <div className="flex gutter" style={{ marginBottom: '.1em' }}>
        <div className="col-2" />
        <div className="col-2 text-center">
          <div className="resources">
            <MegaCredit value="54" />
            <Param name="card back" tag="science" />
          </div>
        </div>
        <div className="col-3 description bottom">{desc}</div>
      </div>

      <div className="effect">
        <div className="effect-title">Effect</div>
        <div className="flex">
          <div className="col-3">
            <div className="table text-left">
              <div className="row">
                <div className="cell resources">
                  <Tag name="microbe" anyone />:
                </div>
                <div className="cell resources">
                  <Resource name="disease" />
                  <MegaCredit value="-4" />
                </div>
              </div>
              <div className="row">
                <div className="cell resources">
                  <Tag name="science" />: &ndash;
                </div>
                <div className="cell resources">
                  <Resource name="disease" />
                  <Resource name="tr" />
                </div>
              </div>
              <div className="row">
                <div className="cell resources text-right">
                  <span>OR 3</span>
                </div>
                <div className="cell resources">
                  <Resource name="tr" />
                  <Tag name="event" />*
                </div>
              </div>
            </div>
          </div>
          <div className="col-4 description">{effectDesc}</div>
        </div>
      </div>
    </div>
  )
});
