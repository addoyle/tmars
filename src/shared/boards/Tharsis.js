import React from 'react';
import {
  Resource,
  Tile,
  Tag,
  Param,
  Production,
  MegaCredit
} from '../../client/game/components/assets/Assets';

/**
 * Tharsis Board
 */
const Tharsis = {
  field: [
    [
      { resources: [0, 0, 'steel', 'steel'] },
      { resources: ['steel', 'steel'], attrs: ['reserved-ocean'] },
      {},
      { resources: ['card'], attrs: ['reserved-ocean'] },
      { attrs: ['reserved-ocean'] }
    ],
    [
      {},
      { resources: ['steel'], text: 'Tharsis Tholus', attrs: ['volcano'] },
      {},
      {},
      {},
      { resources: ['card', 'card'], attrs: ['reserved-ocean'] }
    ],
    [
      { resources: ['card'], text: 'Ascraeus Mons', attrs: ['volcano'] },
      {},
      {},
      {},
      {},
      {},
      { resources: ['steel'] }
    ],
    [
      {
        resources: ['titanium', 'plant'],
        text: 'Pavonis Mons',
        attrs: ['volcano']
      },
      { resources: ['plant'] },
      { resources: ['plant'] },
      { resources: ['plant'] },
      { resources: ['plant', 'plant'] },
      { resources: ['plant'] },
      { resources: ['plant'] },
      { resources: ['plant', 'plant'], attrs: ['reserved-ocean'] }
    ],
    [
      {
        resources: ['plant', 0, 'plant'],
        text: 'Arsia Mons',
        attrs: ['volcano']
      },
      { resources: ['plant', 'plant'] },
      {
        resources: ['plant', 'plant'],
        attrs: ['reserved-noctis-city'],
        text: 'Noctis City'
      },
      { resources: ['plant', 'plant'], attrs: ['reserved-ocean'] },
      { resources: ['plant', 'plant'], attrs: ['reserved-ocean'] },
      { resources: ['plant', 'plant'], attrs: ['reserved-ocean'] },
      { resources: ['plant', 'plant'] },
      { resources: ['plant', 'plant'] },
      { resources: ['plant', 'plant'] }
    ],
    [
      { resources: ['plant'] },
      { resources: ['plant', 'plant'] },
      { resources: ['plant'] },
      { resources: ['plant'] },
      { resources: ['plant'] },
      { resources: ['plant'], attrs: ['reserved-ocean'] },
      { resources: ['plant'], attrs: ['reserved-ocean'] },
      { resources: ['plant'], attrs: ['reserved-ocean'] }
    ],
    [{}, {}, {}, {}, {}, { resources: ['plant'] }, {}],
    [
      { resources: ['steel', 'steel'] },
      {},
      { resources: ['card'] },
      { resources: ['card'] },
      {},
      { resources: ['titanium'] }
    ],
    [
      { resources: ['steel'] },
      { resources: ['steel', 'steel'] },
      {},
      {},
      { resources: ['titanium', 'titanium'], attrs: ['reserved-ocean'] }
    ]
  ],
  milestones: [
    {
      name: 'Terraformer',
      getValue: player => player.tr,
      icon: <Resource name="tr" />,
      requirement: 35,
      description: 'Have a terraform rating of at least 35',
      color: '#e24e26',
      highlight: 'rgba(255,165,0,.5)',
      qualifies: player => player.tr >= 35
    },
    {
      name: 'Mayor',
      getValue: player => player.tiles.city,
      icon: <Tile name="city" />,
      requirement: 3,
      description: 'Own at least 3 city tiles',
      color: '#666',
      highlight: 'rgba(255,255,255,.9)',
      qualifies: (player, game) =>
        game.field
          .flat()
          .concat(Object.values(game.offMars))
          .filter(t => ['city', 'capital city'].includes(t.type))
          .filter(t => t.player === player.number).length >= 3
    },
    {
      name: 'Gardener',
      getValue: player => player.tiles.greenery,
      icon: <Tile name="greenery" noOxygen />,
      requirement: 3,
      description: 'Own at least 3 greenery tiles',
      color: '#52af3c',
      highlight: 'rgba(173,255,47,.5)',
      qualifies: (player, game) =>
        game.field
          .flat()
          .filter(t => t.type === 'greenery' && t.player === player.number)
          .length >= 3
    },
    {
      name: 'Builder',
      getValue: player => player.tags.building,
      icon: <Tag name="building" />,
      requirement: 8,
      description: 'Have at least 8 building tags in play',
      color: '#805835',
      highlight: 'rgba(185,153,121,.7)',
      qualifies: player => player.tags.building >= 8
    },
    {
      name: 'Planner',
      getValue: player => player.cards.hand.length,
      icon: <Param name="card back" />,
      requirement: 16,
      description:
        'Have at least 16 cards in your hand when you claim this milestone',
      color: '#39557c',
      highlight: 'rgba(135,206,235,.7)',
      qualifies: player => player.cards.hand.length >= 16
    }
  ],
  awards: [
    {
      name: 'Landlord',
      getValue: player =>
        player.tiles.city + player.tiles.greenery + player.tiles.special,
      icon: (
        <Tile name="blank-city capital" noIcon>
          <div className="icon-text">X</div>
        </Tile>
      ),
      description: 'Own the most tiles in play',
      value: (player, game) =>
        game.field
          .flat()
          .concat(Object.values(game.offMars))
          .filter(t => t.player === player.number).length
    },
    {
      name: 'Banker',
      getValue: player => player.production.megacredit,
      icon: (
        <Production key="banker">
          <div className="flex">
            <MegaCredit />
          </div>
        </Production>
      ),
      description: 'Have the highest M€ production',
      value: player => player.production.megacredit
    },
    {
      name: 'Scientist',
      getValue: player => player.tags.science,
      icon: <Tag name="science" />,
      description: 'Have the most science tags in play'
    },
    {
      name: 'Thermalist',
      getValue: player => player.resources.heat,
      icon: <Resource name="heat" />,
      description: 'Have the most heat resources',
      value: player => player.tags.science
    },
    {
      name: 'Miner',
      getValue: player => player.resources.steel + player.resources.titanium,
      icon: (
        <>
          <Resource name="steel" key="miner-steel" />
          <Resource name="titanium" key="miner-titanium" />
        </>
      ),
      description: 'Have the most steel and titanium resources',
      value: player => player.resources.steel + player.resources.titanium
    }
  ]
};

export default Tharsis;
