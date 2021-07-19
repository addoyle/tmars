import React from 'react';
import Active from '../Active';
import {
  Resource,
  Param,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';
import { times } from 'lodash';

const activeDesc =
  'Action: Spend any amount of energy to draw the same number of cards. TAKE 1 INTO HAND AND DISCARD THE REST.';

export default new Active({
  number: 'X04',
  title: 'Hi-Tech Lab',
  cost: 17,
  tags: ['science', 'building'],
  set: 'promo',
  activeDesc,
  flavor:
    'Expensive equipment and highly educated researchers focusing on advanced projects',
  actions: [
    {
      name: 'Draw Card(s)',
      icon: <Param name="card back" />,
      counter: {
        name: 'Use Energy',
        max: player => player.resources.power,
        icon: <Resource name="power" />,
        resultIcon: count => (
          <>
            <span>{count}</span>
            <Resource name="power" />
          </>
        )
      },
      canPlay: (player, game, cardStore, count) => {
        const valid = count > 0;
        return {
          valid,
          msg: !valid ? 'Requires at least 1 energy' : null
        };
      },
      resources: {
        power: (player, game, { count }) => -count
      },
      action: (player, game, { count }) => {
        const cards = [];
        times(count, () => cards.push(game.drawCard()));

        game.promptCard(player, {
          cards,
          action: (player, game, cards) =>
            (player.cards.hand = [...player.cards.hand, ...cards])
        });
      }
    }
  ],
  vp: 1,
  emoji: '🔬',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span>X</span>
        <Resource name="power" />
        <span className="arrow" />
        <Param name="card back" />
        <span>*</span>
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-1" />
      <div className="bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
