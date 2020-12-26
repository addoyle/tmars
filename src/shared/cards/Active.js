import Project from './Project';

export default class Active extends Project {
  activeDesc; // Top description
  activeLayout; // Top layout
  resource; // Resource type for card
  actions; // List of possible actions to be peformed
  type = 'active';

  constructor(props) {
    super(props);

    Object.assign(this, props);
  }
}
