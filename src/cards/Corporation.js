import Card from './Card';

export default class Corporation extends Card {
  titleClass; // Custom CSS class for styling
  starting;   // Starting resources
  effectDesc; // Action/Effect description

  constructor(props) {
    super(props);

    Object.assign(this, props);
  }
}