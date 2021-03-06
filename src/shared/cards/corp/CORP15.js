import React from 'react';
import Corporation from '../Corporation';
import {
  MegaCredit,
  Resource,
  Production,
  Tag
} from '../../../client/game/components/assets/Assets';

const desc = 'You start with 38 M€ and 1 steel production.';
const effectDesc =
  'Effect: When you play a building tag, including this, gain 1 microbe to this card, or remove 2 microbes here and raise your plant production 1 step.';

const card = new Corporation({
  number: 'CORP15',
  title: 'Recyclon',
  titleStyle: {
    fontSize: '.1em',
    textTransform: 'uppercase',
    margin: '0.7em .5em -1.3em',
    textAlign: 'center',
    color: 'white',
    background: '#BE1217',
    border: '.05em solid black',
    boxShadow: '.2em .2em .2em rgba(0,0,0,.5)',
    width: '5.6em',
    borderRadius: '1em',
    padding: '.3em'
  },
  resources: { megacredit: 38 },
  production: { steel: 1 },
  starting: (player, game) =>
    // Revealing corps doesn't trigger events, so place a microbe now
    game.cardResource(player, card, 1),
  tags: ['microbe', 'building'],
  set: 'promo',
  desc,
  effectDesc,
  resource: 'microbe',
  events: {
    onCardPlayed: (player, game, playedCard) => {
      // Is a building card
      if (playedCard.tags.includes('building')) {
        // TODO: This should be an OR
        // Resources are over 2, raise plant production
        if (game.cardResource(player, card) >= 2) {
          game.production(player, 'plant', 1);
          game.cardResource(player, card, -2);
        }
        // Otherwise, bump resources
        else {
          game.cardResource(player, card, 1);
        }
        return true;
      }
    }
  },
  flavor:
    'Recycling is the way of the future, especially on a barren planet like Mars, making Recyclon an efficient builder of the Martian society.',
  layout: (
    <div>
      <div className="flex gutter">
        <div className="col-2" />
        <div className="col-1 middle flex">
          <div className="resources middle center">
            <MegaCredit value="38" />
          </div>
          <div className="middle center">
            <Production>
              <div className="flex">
                <Resource name="steel" />
              </div>
            </Production>
          </div>
        </div>
        <div className="col-1 middle">
          <div className="description text-center">{desc}</div>
        </div>
      </div>

      <div className="flex m-top">
        <div className="effect">
          <div className="effect-title">Effect</div>
          <div className="resources text-center">
            <Tag name="building" /> : <Resource name="microbe" />{' '}
            <span>OR &ndash;</span>
            <Resource name="microbe" />
            <Resource name="microbe" />
            <span>+</span>
            <Production>
              <div className="flex">
                <Resource name="plant" />
              </div>
            </Production>
          </div>
          <div className="description">{effectDesc}</div>
        </div>
      </div>
    </div>
  )
});

export default card;
