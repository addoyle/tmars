import Card from './Card';
export default class Corporation extends Card {
  titleClass; // Custom CSS class for styling
  starting; // Starting resources
  effectDesc; // Action/Effect description
  resource; // Resource type for card
  actions; // List of possible actions to be peformed
  type = 'corporation';

  constructor(props) {
    super(props);

    Object.assign(this, props);
  }
}
