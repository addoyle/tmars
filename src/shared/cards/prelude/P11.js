import React from 'react';
import Prelude from '../Prelude';

const desc = 'PLAY A CARD FROM HAND, REDUCING ITS COST BY 25 M€';

export default new Prelude({
  number: 'P11',
  title: 'Excentric Sponsor',
  tags: [],
  set: 'prelude',
  desc,
  flavor: 'He’ll support you, but he wants something big with his name on it',
  emoji: '🧐',
  serverAction: () => {
    // TODO: Play card from hand, reducing cost by 25
  },
  layout: (
    <div className="flex m-top m-bottom">
      <div className="col-1" />
      <div className="col-3 text-center">{desc}</div>
      <div className="col-1" />
    </div>
  )
});
