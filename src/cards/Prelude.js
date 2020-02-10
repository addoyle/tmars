import Card from './Card';

export default class Prelude extends Card {
  emoji;        // Emoji of card, used for card art
  layout;       // Layout of the card
  clientEffect = () => {};  // Client effect of the card
  serverEffect = () => {};  // Server effect of the card

  constructor(props) {
    super(props);

    Object.assign(this, props);
  }
}