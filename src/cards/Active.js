import Project from './Project';

export default class Active extends Project {
  activeDesc;   // Top description
  activeLayout; // Top layout
  resources;    // Current resources on card

  constructor(props) {
    super(props);

    Object.assign(this, props);
  }
}