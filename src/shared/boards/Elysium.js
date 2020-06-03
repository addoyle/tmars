import React from 'react';
import {
  Production,
  Resource,
  MegaCredit,
  Tag,
  Param,
  Tile
} from '../../client/game/components/assets/Assets';

/**
 * Elysium Board
 */
const Elysium = {
  field: [
    [
      { attrs: ['reserved-ocean'] },
      { resources: ['titanium'], attrs: ['reserved-ocean'] },
      { resources: ['card'], attrs: ['reserved-ocean'] },
      { resources: ['steel'], attrs: ['reserved-ocean'] },
      { resources: ['card'] }
    ],
    [
      { resources: ['titanium'], text: 'Hecates Tholus', attrs: ['volcano'] },
      {},
      {},
      { attrs: ['reserved-ocean'] },
      { attrs: ['reserved-ocean'] },
      { resources: ['steel', 'steel'] }
    ],
    [
      {
        resources: ['titanium', 'titanium'],
        text: 'Elysium Mons',
        attrs: ['volcano']
      },
      {},
      { resources: ['card'] },
      {},
      { resources: ['plant'], attrs: ['reserved-ocean'] },
      { attrs: ['reserved-ocean'] },
      {
        resources: ['card', 'card', 'card'],
        text: 'Olympus Mons',
        attrs: ['volcano']
      }
    ],
    [
      { resources: ['plant'] },
      { resources: ['plant'] },
      { resources: ['plant'] },
      { resources: ['plant', 'plant'], attrs: ['reserved-ocean'] },
      { resources: ['plant'] },
      { resources: ['plant'], attrs: ['reserved-ocean'] },
      { resources: ['plant'], attrs: ['reserved-ocean'] },
      { resources: ['plant', 'steel'] }
    ],
    [
      { resources: ['plant', 0, 'plant'] },
      { resources: ['plant', 'plant'] },
      { resources: ['plant', 'plant'] },
      { resources: ['plant', 'plant'], attrs: ['reserved-ocean'] },
      { resources: ['plant', 'plant'] },
      { resources: ['plant', 'plant', 'plant'] },
      { resources: ['plant', 'plant'] },
      { resources: ['plant', 'plant'] },
      {
        resources: ['titanium', 'plant'],
        text: 'Arsia Mons',
        attrs: ['volcano']
      }
    ],
    [
      { resources: ['steel'] },
      { resources: ['plant'] },
      { resources: ['plant'] },
      { resources: ['plant'] },
      { resources: ['plant'] },
      { resources: ['plant'] },
      { resources: ['plant'] },
      {}
    ],
    [
      { resources: ['titanium'] },
      { resources: ['steel'] },
      {},
      {},
      { resources: ['steel'] },
      {},
      {}
    ],
    [
      { resources: ['steel', 'steel'] },
      {},
      {},
      {},
      { resources: ['steel', 'steel'] },
      {}
    ],
    [
      { resources: ['steel'] },
      {},
      { resources: ['card'] },
      { resources: ['card'] },
      { resources: ['steel', 'steel'] }
    ]
  ],
  milestones: [
    {
      name: 'Generalist',
      getValue: player =>
        Object.values(player.production).filter(val => val).length,
      icon: (
        <Production>
          <div className="flex">
            <MegaCredit />
            <Resource name="steel" />
            <Resource name="titanium" />
          </div>
          <div className="flex">
            <Resource name="plant" />
            <Resource name="power" />
            <Resource name="heat" />
          </div>
        </Production>
      ),
      requirement: 6,
      label: '+1',
      description:
        'Have increased all 6 productions by at least 1 step (starting production from corporation cards count as increase)'
    },
    {
      name: 'Specialist',
      getValue: player => Math.max(...Object.values(player.production)),
      icon: (
        <Production>
          <div className="flex">
            <Resource name="blank" />
          </div>
        </Production>
      ),
      requirement: 10,
      description: 'Have at least 10 in production of any resource'
    },
    {
      name: 'Ecologist',
      getValue: player =>
        player.tags.plant + player.tags.microbe + player.tags.animal,
      icon: (
        <div className="flex center">
          <div>
            <Tag name="microbe" />
          </div>
          <div>
            <Tag name="plant" />
            <Tag name="animal" />
          </div>
        </div>
      ),
      requirement: 4,
      description: 'Have 4 bio tags (plant, microbe, and animal tags)'
    },
    {
      name: 'Tycoon',
      getValue: player =>
        player.cards.automated.length + player.cards.active.length,
      icon: <Param name="card back" />,
      requirement: 15,
      description: 'Have 15 project cards in play (blue and green cards)'
    },
    {
      name: 'Legend',
      getValue: player => player.cards.event,
      icon: <Tag name="event" />,
      requirement: 5,
      description: 'Have 5 played events (red cards)'
    }
  ],
  awards: [
    {
      name: 'Celebrity',
      getValue: player =>
        player.cards.automated
          .concat(player.cards.active)
          .filter(card => card.cost >= 20).length,
      icon: <MegaCredit value="20" />,
      description:
        'Have the most cards in play (not events) with a cost of at least 20 M€'
    },
    {
      name: 'Industrialist',
      getValue: player => player.resources.steel + player.resources.power,
      icon: (
        <>
          <Resource name="steel" />
          <Resource name="power" />
        </>
      ),
      description: 'Have the most steel and energy resources'
    },
    {
      name: 'Desert Settler',
      // TODO: Calculate this
      getValue: player => player.tags.space,
      icon: <Tile name="city" />,
      description:
        'Have the most tiles south of the equator (the four bottom rows)'
    },
    {
      name: 'Estate Dealer',
      // TODO: Calculate this
      getValue: player => player.tiles.city,
      icon: (
        <>
          <Tile name="any" />
          <Tile name="ocean" />
        </>
      ),
      description: 'Have the most tiles adjacent to ocean tiles'
    },
    {
      name: 'Benefactor',
      getValue: player => player.tr,
      icon: <Resource name="tr" />,
      description: 'Have the highest terraform rating'
    }
  ]
};

export default Elysium;
