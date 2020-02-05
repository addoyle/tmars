import React from 'react';
import Active from '../Active';

const activeDesc = 'ACTION: LOOK AT THE TOP CARD AND EITHER BUY IT OR DISCARD IT.';

export default new Active({
  number: 6,
  title: 'Inventor\'s Guild',
  cost: 9,
  tags: ['science'],
  set: 'corporate',
  activeDesc,
  flavor: 'When great minds meet, new ideas abound',
  clientEffect: game => {},
  serverEffect: game => {},
  emoji: '🤔',
  activeLayout: (
    <div className="flex middle">
      <div className="col-1 resources"><div className="arrow" /></div>
      <div className="col-6"><strong>{activeDesc}</strong></div>
    </div>
  ),
  layout: (
    <div className="m-top m-bottom" />
  )
});
