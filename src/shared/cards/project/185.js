import React from 'react';
import Active from '../Active';
import {
  Tag,
  Resource,
  Param,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'When you play a science tag, including this, either add a science resource to this card, or remove a science resource from this card to draw a card.';
const desc = 'Requires 2 ocean tiles.';

const card = new Active({
  number: '185',
  title: 'Olympus Conference',
  cost: 10,
  tags: ['science', 'earth', 'building'],
  set: 'corporate',
  activeDesc,
  desc,
  resource: 'science',
  flavor:
    'The scientific elite, assembled on the top of Olympus Mons, the highest spot in the solar system',
  events: {
    onCardPlayed: (player, game, playedCard) => {
      console.log('onCardPlayed');
      // Has a science tag
      playedCard.tags.includes('science') &&
        game.promptChoice(player, 'Add science or draw a card', [
          {
            icon: { resource: 'science' },
            label: 'Add science',
            logSnippet: [
              'added a science ',
              { resource: 'science' },
              ' resource'
            ],
            action: (p, game) =>
              game.cardResource(
                player,
                card,
                playedCard.tags.filter(tag => tag === 'science').length
              )
          },
          {
            icon: { param: 'card back' },
            label: 'Draw card',
            logSnippet: ['drew a card ', { param: 'card back' }],
            action: (p, game) => {
              game.cardResource(player, card, -1);
              game.drawCard(player);
            }
          }
        ]);
    }
  },
  vp: 1,
  emoji: '💼',
  todo: true,
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Tag name="science" />:<Resource name="science" />
        <span> OR &ndash;</span>
        <Resource name="science" />
        <span>+</span>
        <Param name="card back" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-3" />
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});

export default card;
