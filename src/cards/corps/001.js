import React from 'react';
import Corporation from '../../client/components/Corporation';
import { MegaCredit, Resource, Tile, Production } from '../../client/components/assets/Assets';

const desc = 'You start with 57 M€.';
const effectDesc = 'Effect: After you pay for a card or standard project with a basic cost of 20 M€ or more, you gain 4 M€.';

export default new Corporation({
  title: 'Credicor',
  titleStyle: {
    fontSize: '.12em',
    textTransform: 'lowercase',
    color: '#fff',
    '-webkit-text-stroke': '.04em #000',
    fontFamily: 'Helvetica, sans-serif',
    letterSpacing: '.1em',
    margin: '.05em auto 0 auto',
    textShadow: '.1em .1em .3em rgba(0,0,0,.5)',
    padding: '.2em',
    border: '.05em solid purple',
    width: '5em'
  },
  starting: {
    mc: 57
  },
  tags: [],
  desc,
  effectDesc,
  flavor: 'Multibillionaire Bard Hunter likes terraforming, especially when it involves hurling asteroids at Mars. He also has a hunch that it\'s going to pay off. His company CrediCor has all the resources he needs to jump right into the contest.',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <div className="resources text-center">
          <MegaCredit value="36" />
        </div>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-2 middle">
        <div className="effect">
          <div className="effect-title">Effect</div>
          <div className="resources">
            <span>&ndash;</span>
            <MegaCredit value="20" />:
            <MegaCredit value="4" />
          </div>
          <div className="description">{effectDesc}</div>
        </div>
      </div>
    </div>
  )
});