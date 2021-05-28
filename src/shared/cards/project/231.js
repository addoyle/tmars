import React from 'react';
import Event from '../Event';
import {
  Resource,
  Param,
  Tag
} from '../../../client/game/components/assets/Assets';

const desc =
  'Raise Venus 1 step. Add 1 floater to A VENUS CARD for each Jovian tag you have.';

export default new Event({
  number: '231',
  title: 'Hydrogen To Venus',
  cost: 11,
  tags: ['space', 'event'],
  set: 'venus',
  desc,
  flavor:
    'Easily collected from the gas giants, hydrogen can increase floating power, or be converted to precious water',
  action: (player, game, done) =>
    // TODO: Figure out floaters
    done(),
  param: ['venus'],
  emoji: '🌀',
  todo: true,
  layout: (
    <div className="flex">
      <div className="col-2 middle">
        <div className="resources">
          <Param name="venus" />
        </div>
        <div className="resources">
          <Resource name="floater" tag="venus" />
          <span>/</span>
          <Tag name="jovian" />
        </div>
      </div>
      <div className="col-3 middle description">{desc}</div>
    </div>
  )
});
