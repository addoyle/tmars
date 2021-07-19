import Card from './Card';

export default class Project extends Card {
  cost; // Cost to fund
  restriction; // Restrictions in order to play
  vp; // Victory points, or function for variable VPs
  emoji; // Emoji of card, used for card art
  layout; // Layout of the car

  constructor(props) {
    super(props);

    Object.assign(this, props);
  }

  /**
   * Any card specific requirements for play excluding global restrictions and resource/production requirements.
   */
  canPlay() {
    return { valid: true };
  }
}
