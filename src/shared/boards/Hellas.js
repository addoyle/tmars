import React from 'react';
import {
  Tag,
  Tile,
  Production,
  Resource
} from '../../client/game/components/assets/Assets';

/**
 * Hellas Board
 */
const Hellas = {
  field: [
    [
      { resources: [0, 0, 'plant', 'plant'], attrs: ['reserved-ocean'] },
      { resources: ['plant', 'plant'] },
      { resources: ['plant', 'plant'] },
      { resources: ['plant', 'steel'] },
      { resources: ['plant'] }
    ],
    [
      { resources: ['plant', 'plant'], attrs: ['reserved-ocean'] },
      { resources: ['plant', 'plant'] },
      { resources: ['plant'] },
      { resources: ['plant', 'steel'] },
      { resources: ['plant'] },
      { resources: ['plant'] }
    ],
    [
      { resources: ['plant'], attrs: ['reserved-ocean'] },
      { resources: ['plant'] },
      { resources: ['steel'] },
      { resources: ['steel'] },
      {},
      { resources: ['plant', 'plant'] },
      { resources: ['card', 'plant'] }
    ],
    [
      { resources: ['plant'], attrs: ['reserved-ocean'] },
      { resources: ['plant'] },
      { resources: ['steel'] },
      { resources: ['steel', 'steel'] },
      { resources: ['steel'] },
      { resources: ['plant'], attrs: ['reserved-ocean'] },
      { resources: ['plant'], attrs: ['reserved-ocean'] },
      { resources: ['plant'] }
    ],
    [
      { resources: ['card'] },
      {},
      {},
      { resources: ['steel', 'steel'] },
      {},
      { resources: ['card'], attrs: ['reserved-ocean'] },
      { resources: ['heat', 'heat', 'heat'], attrs: ['reserved-ocean'] },
      { attrs: ['reserved-ocean'] },
      { resources: ['plant'] }
    ],
    [
      { resources: ['titanium'] },
      {},
      { resources: ['steel'] },
      {},
      {},
      { attrs: ['reserved-ocean'] },
      { resources: ['steel'], attrs: ['reserved-ocean'] },
      {}
    ],
    [
      { resources: ['titanium', 'titanium'], attrs: ['reserved-ocean'] },
      {},
      {},
      { resources: ['card'] },
      {},
      {},
      { resources: ['titanium'] }
    ],
    [
      { resources: ['steel'] },
      { resources: ['card'] },
      { resources: ['heat', 'heat'] },
      { resources: ['heat', 0, 'heat'] },
      { resources: ['titanium'] },
      { resources: ['titanium'] }
    ],
    [
      {},
      { resources: ['heat', 'heat'] },
      { resources: [0, 'ocean', { megacredit: -6 }] },
      { resources: ['heat', 'heat'] },
      {}
    ]
  ],
  milestones: [
    {
      name: 'Diversifier',
      getValue: player => Object.values(player.tags).filter(tag => tag).length,
      icon: <Tag name="all" />,
      requirement: 8,
      description: 'Have 8 different tags in play'
    },
    {
      name: 'Tactician',
      getValue: player =>
        player.cards.active
          .concat(player.cards.automated)
          .filter(card => card.restriction).length,
      // TODO: Render this
      icon: <Tile name="city" />,
      requirement: 5,
      description: 'Have 5 cards with requirements in play'
    },
    {
      name: 'Polar Explorer',
      // TODO: Calculate this
      getValue: player => player.tiles.greenery,
      // TODO: Render this
      icon: <Tile name="greenery" />,
      requirement: 3,
      description: 'Have 3 tiles on the two bottom rows'
    },
    {
      name: 'Energizer',
      getValue: player => player.production.power,
      icon: (
        <Production>
          <Resource name="power" />
        </Production>
      ),
      requirement: 6,
      description: 'Have 6 energy production'
    },
    {
      name: 'Rim Settler',
      getValue: player => player.tags.jovian,
      icon: <Tag name="jovian" />,
      requirement: 3,
      description: 'Have 3 jovian tags'
    }
  ],
  awards: [
    {
      name: 'Cultivator',
      value: player => player.tiles.greenery,
      icon: <Tile name="greenery" />,
      description: 'Have the most greenery tiles'
    },
    {
      name: 'Magnate',
      value: player => player.cards.automated.length,
      // TODO: Render this
      icon: <Tag name="plant" />,
      description: 'Have the most automated cards in play (green cards)'
    },
    {
      name: 'Space Baron',
      value: player => player.tags.space,
      icon: <Tag name="space" />,
      description: 'Have the most space tags (event cards do not count)'
    },
    {
      name: 'Excentric',
      value: player =>
        [player.cards.active, player.corp].reduce(
          (sum, card) => sum + (card.resource || 0),
          0
        ),
      // TODO: Render this
      icon: <Resource name="heat" />,
      description: 'Have the most resources on cards'
    },
    {
      name: 'Contractor',
      value: player => player.tags.building,
      icon: <Tag name="building" />,
      description: 'Have the most building tags (event cards do not count)'
    }
  ]
};

export default Hellas;
