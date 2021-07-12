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
const field = [
  [
    { resources: [0, 0, 'plant', 'plant'], attrs: ['reserved-ocean'] },
    { resources: ['plant', 'plant'] },
    { resources: ['plant', 'plant'] },
    { resources: ['plant', 'steel'] },
    { resources: [0, 'plant'] }
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
    {
      resources: ['heat', 'heat', 'heat'],
      text: 'Hellas Planitia',
      attrs: ['reserved-ocean']
    },
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
    {
      resources: ['titanium', 'titanium'],
      text: 'Argyre Planitia',
      attrs: ['reserved-ocean']
    },
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
    { resources: [0, 'ocean', { megacredit: -6 }], text: 'SOUTH POLE' },
    { resources: ['heat', 'heat'] },
    {}
  ]
];
const Hellas = {
  field,
  milestones: [
    {
      name: 'Diversifier',
      icon: <Tag name="all" />,
      requirement: 8,
      description: 'Have 8 different tags in play',
      qualifies: player =>
        Object.values(player.tags).filter(tag => tag).length >= 8
    },
    {
      name: 'Tactician',
      // TODO: Render this
      icon: <Tile name="city" />,
      requirement: 5,
      description: 'Have 5 cards with requirements in play',
      qualifies: player =>
        player.cards.active
          .concat(player.cards.automated)
          .filter(card => card.restriction).length >= 5
    },
    {
      name: 'Polar Explorer',
      icon: (
        <div className="field">
          <Tile>
            <div className="rotate-reset">
              <div className="tiles">
                {field.map((row, r) => (
                  <div className="row" key={`desert-${r}`}>
                    {row.map((area, i) => (
                      <Tile
                        key={`area-${r}-${i}`}
                        name={r >= 7 ? 'white' : 'blank'}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="floating-tile" style={{ bottom: '.3333em' }}>
                <Tile name="blank-city capital" noIcon />
              </div>
            </div>
          </Tile>
        </div>
      ),
      requirement: 3,
      description: 'Have 3 tiles on the two bottom rows',
      qualifies: (player, game) =>
        game.field
          // Last 2 rows
          .slice(7)
          .flat()
          .filter(t => t.player === player.number).length >= 3
    },
    {
      name: 'Energizer',
      icon: (
        <Production>
          <Resource name="power" />
        </Production>
      ),
      requirement: 6,
      description: 'Have 6 energy production',
      qualifies: player => player.production.power >= 6
    },
    {
      name: 'Rim Settler',
      icon: <Tag name="jovian" />,
      requirement: 3,
      description: 'Have 3 jovian tags',
      qualifies: player => player.tags.jovian >= 3
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
