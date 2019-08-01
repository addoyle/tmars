import React, { Component } from 'react';
import './StandardProjects.scss';
import { Param, MegaCredit, Tile, Resource, Production } from '../assets/Assets';

/**
 * Standard Projects pane
 */
export default class StandardProjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false
    };

    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  toggleCollapse() {
    this.setState({collapse: !this.state.collapse});
  }

  render() {
    return (
      <div className={`standard-projects ${this.state.collapse ? 'collapse' : ''}`} onMouseDown={e => e.stopPropagation()} onMouseMove={e => e.stopPropagation()}>
        <div className="header text-center">
          <button className="standard-project" onClick={this.toggleCollapse}>
            Standard Projects
          </button>
        </div>

        <div className="row flex middle">
          <div className="resources middle">
            <span className="x">X</span>
            <Param name="card back" />
            <span className="arrow" />
          </div>
          <div className="resources middle text-center col-1">
            <MegaCredit value="X" />
          </div>
          <button className="standard-project middle">Sell Patents</button>
        </div>

        <div className="row flex middle">
          <div className="resources middle">
            <MegaCredit value="11" />
            <span className="arrow" />
          </div>
          <div className="resources middle text-center col-1">
            <Production>
              <div className="flex">
                <Resource name="power" />
              </div>
            </Production>
          </div>
          <button className="standard-project middle">Power Plant</button>
        </div>

        <div className="row flex middle">
          <div className="resources middle">
            <MegaCredit value="14" />
            <span className="arrow" />
          </div>
          <div className="resources middle text-center col-1">
            <Param name="temperature" />
          </div>
          <button className="standard-project middle">Asteroid</button>
        </div>

        <div className="row flex middle">
          <div className="resources middle">
            <MegaCredit value="18" />
            <span className="arrow" />
          </div>
          <div className="resources middle text-center col-1">
            <Tile name="ocean" />
          </div>
          <button className="standard-project middle">Aquifer</button>
        </div>

        <div className="row flex middle">
          <div className="resources middle">
            <MegaCredit value="23" />
            <span className="arrow" />
          </div>
          <div className="resources middle text-center col-1">
            <Tile name="greenery" />
          </div>
          <button className="standard-project middle">Greenery</button>
        </div>

        <div className="row flex middle city">
          <div className="resources middle">
            <MegaCredit value="25" />
            <span className="arrow" />
          </div>
          <div className="resources middle text-center col-1">
            <Tile name="city" />
            <Production>
              <div className="flex">
                <MegaCredit value="1" />
              </div>
            </Production>
          </div>
          <button className="standard-project middle">City</button>
        </div>

      </div>
    );
  }
}
