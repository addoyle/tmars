import React from 'react';
import Param from '../../../client/game/components/assets/Param';
import Active from '../Active';

// TODO ACTION

const activeDesc =
  'ACTION: LOOK AT THE TOP CARD AND EITHER BUY IT OR DISCARD IT.';

export default new Active({
  number: '006',
  title: "Inventor's Guild",
  cost: 9,
  tags: ['science'],
  set: 'corporate',
  activeDesc,
  flavor: 'When great minds meet, new ideas abound',
  actions: [
    {
      name: 'Look at top card',
      icon: <Param name="card back" />,
      action: (player, game) =>
        game.promptCard(player, {
          deck: 'buy'
        })
    }
  ],
  emoji: '🤔',
  activeLayout: (
    <div className="flex middle">
      <div className="col-1 resources">
        <div className="arrow" />
      </div>
      <div className="col-6">
        <strong>{activeDesc}</strong>
      </div>
    </div>
  ),
  layout: <div className="m-top m-bottom" />
});
