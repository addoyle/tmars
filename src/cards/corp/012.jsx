import React from 'react';
import Corporation from '../Corporation';
import {
  MegaCredit,
  Resource,
  Tag,
  Production
} from '../../client/game/components/assets/Assets';

const desc = 'You start with 1 titanium production and 42 M€.';
const effectDesc =
  'Effect: Each time any Jovian tag is put into play, including this, increase your M€ production 1 step.';

export default new Corporation({
  number: 12,
  title: 'Saturn Systems',
  titleStyle: {
    fontSize: '.07em',
    textTransform: 'uppercase',
    margin: '.7em auto',
    padding: '.2em 2.4em',
    color: 'white',
    background: 'indigo',
    border: '.1em solid white',
    boxShadow: '0 0 0 .03em black, 0 .5em .5em rgba(0,0,0,.5)',
    borderRadius: '100%'
  },
  starting: {
    resources: {
      mc: 60
    }
  },
  tags: ['jovian'],
  set: 'corporate',
  desc,
  effectDesc,
  flavor:
    "Having acquired the mining rights on several of Saturn's moons, Saturn Systems gained plenty of experience over the years. As a supplier of rare metals, space ships, and fuel, the company has made itself indispensible to the outer planets. Saturn Systems is now ready to play a key role in the terraforming of Mars.",
  layout: (
    <div className="flex gutter">
      <div className="col-3 middle">
        <div className="flex">
          <div className="middle center">
            <Production>
              <div className="flex">
                <Resource name="titanium" />
              </div>
            </Production>
          </div>
          <div className="resources middle center">
            <MegaCredit value="42" />
          </div>
        </div>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-4 middle">
        <div className="effect">
          <div className="effect-title">Effect</div>
          <div className="flex center">
            <div className="resources middle">
              <Tag name="jovian" anyone /> :&nbsp;
            </div>
            <Production>
              <div className="flex">
                <MegaCredit value="1" />
              </div>
            </Production>
          </div>
          <div className="description">{effectDesc}</div>
        </div>
      </div>
    </div>
  )
});
