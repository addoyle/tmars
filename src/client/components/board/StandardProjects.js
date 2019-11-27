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
      collapse: true
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
            Standard <span className="highlight">P</span>rojects
          </button>
        </div>

        <div className="table row">
          <div className="row">
            <div className="cell">
              <div className="resources middle text-right m-right">
                <span className="x">X</span>
                <Param name="card back" />
              </div>
            </div>
            <div className="cell">
              <div className="resources middle">
                <span className="arrow" />
              </div>
            </div>
            <div className="flex">
              <div className="resources middle text-center col-1">
                <MegaCredit value="X" />
              </div>
              <button className="standard-project middle">Sell Patents</button>
            </div>
          </div>

          <div className="row">
            <div className="cell">
              <div className="resources middle text-right">
                <MegaCredit value="11" />
              </div>
            </div>
            <div className="cell">
              <div className="resources middle">
                <span className="arrow" />
              </div>
            </div>
            <div className="flex">
              <div className="resources middle text-center col-1">
                <Production>
                  <div className="flex">
                    <Resource name="power" />
                  </div>
                </Production>
              </div>
              <button className="standard-project middle">Power Plant</button>
            </div>
          </div>

          <div className="row">
            <div className="cell">
              <div className="resources middle text-right">
                <span>8</span>
                <Resource name="heat" />
                <span>OR</span>
                <MegaCredit value="14" />
              </div>
            </div>
            <div className="cell">
              <div className="resources middle">
                <span className="arrow" />
              </div>
            </div>
            <div className="flex">
              <div className="resources middle text-center col-1">
                <Param name="temperature" />
              </div>
              <button className="standard-project middle">Asteroid</button>
            </div>
          </div>

          <div className="row">
            <div className="cell">
              <div className="resources middle text-right">
                <MegaCredit value="18" />
              </div>
            </div>
            <div className="cell">
              <div className="resources middle">
                <span className="arrow" />
              </div>
            </div>
            <div className="flex">
              <div className="resources middle text-center col-1">
                <Tile name="ocean" />
              </div>
              <button className="standard-project middle">Aquifer</button>
            </div>
          </div>

          <div className="row">
            <div className="cell">
              <div className="resources middle text-right">
                <span>8</span>
                <Resource name="plant" />
                <span>OR</span>
                <MegaCredit value="23" />
              </div>
            </div>
            <div className="cell">
              <div className="resources middle">
                <span className="arrow" />
              </div>
            </div>
            <div className="flex">
              <div className="resources middle text-center col-1">
                <Tile name="greenery" />
              </div>
              <button className="standard-project middle">Greenery</button>
            </div>
          </div>

          <div className="row">
            <div className="cell">
              <div className="resources middle text-right">
                <MegaCredit value="25" />
              </div>
            </div>
            <div className="cell">
              <div className="resources middle">
                <span className="arrow" />
              </div>
            </div>
            <div className="flex city">
              <div className="resources middle text-center">
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
        </div>
      </div>
    );
  }
}
