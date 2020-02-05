import Card from './Card';

export default class Project extends Card {
  cost;         // Cost to fund
  restriction;  // Restrictions in order to play
  vp;           // Victory points, or function for variable VPs
  emoji;        // Emoji of card, Used for card art
  layout;       // Layout of the card
  clientEffect = () => {};  // Client effect of the card
  serverEffect = () => {};  // Server effect of the card

  constructor(props) {
    super(props);

    Object.assign(this, props);
  }
}