export default class Card {
  number; // Unique card number
  title; // Card title
  tags; // Array of tags
  desc; // Description of card
  flavor; // Flavor text
  set = 'base'; // Game set, e.g. corporate era, preludes, venus next, ...
  landscape = false; // Orientation of the card
  todo = false; // Marks a card as "unfinished"
  action; // Function to handle the action of the card

  constructor(props) {
    Object.assign(this, props);
  }
}
