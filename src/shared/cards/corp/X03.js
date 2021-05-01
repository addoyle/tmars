import React from 'react';
import Corporation from '../Corporation';
import {
  MegaCredit,
  Resource,
  Tile
} from '../../../client/game/components/assets/Assets';

const desc =
  'You start with 47 M€. As your first action, place a greenery tile and raise the oxygen 1 step.';
const effectDesc =
  "Effect: Each new adjacency between your tile and an opponent's tile gives you a standard resource of your choice (regardless of who just placed a tile).";

export default new Corporation({
  number: 'X03',
  title: 'Philares',
  titleClass: 'philares',
  resources: { megacredit: 47 },
  firstAction: (player, game, done) =>
    game.promptTile(player, 'greenery', done),
  tags: ['building'],
  set: 'promo',
  desc,
  effectDesc,
  todo: true,
  flavor:
    'Seeing opportunities and profits in taking advantage of the development other corporations are bringing to the Martian landscape, Philares loves the action on Mars!',
  layout: (
    <div>
      <div className="flex gutter">
        <div className="col-2 middle text-center">
          <div className="resources">
            <MegaCredit value="47" />
            <Tile name="greenery" />
          </div>
          <div className="description">{desc}</div>
        </div>
        <div className="col-3 text-center">
          <div className="effect">
            <div className="effect-title">Effect</div>
            <div className="resources">
              <Tile name="blank-city" anyone />
              <Tile name="blank-city" style={{ marginLeft: '-.3em' }} /> :{' '}
              <Resource name="any" />
            </div>
            <div className="description m-bottom">{effectDesc}</div>
          </div>
        </div>
      </div>
    </div>
  )
});
