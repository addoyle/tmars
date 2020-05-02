import React, { useState } from 'react';
import './StandardProjects.scss';
import {
  Param,
  MegaCredit,
  Tile,
  Resource,
  Production
} from '../assets/Assets';
import classNames from 'classnames';

/**
 * Standard Projects pane
 */
const StandardProjects = () => {
  const [collapse, setCollapse] = useState(true);

  // TODO: reduce duplication

  return (
    <div
      className={classNames('standard-projects', { collapse })}
      onMouseDown={e => e.stopPropagation()}
      onMouseMove={e => e.stopPropagation()}
    >
      <div className="header text-center">
        <button
          className="standard-project"
          onClick={() => setCollapse(!collapse)}
        >
          Standard Projects
        </button>
      </div>

      <div className="table">
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
            <div className="resources middle text-right p-rel stack-bottom">
              <span>8</span>
              <Resource name="heat" />
            </div>
            <div className="resources middle text-right p-rel">
              <span className="sub small">OR</span>
              <MegaCredit value="14" />
            </div>
          </div>
          <div className="cell middle">
            <div className="resources middle">
              <span className="arrow" />
            </div>
          </div>
          <div className="cell middle">
            <div className="flex">
              <div className="resources middle text-center col-1">
                <Param name="temperature" />
              </div>
              <button className="standard-project middle">Asteroid</button>
            </div>
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
            <div className="resources middle text-right p-rel stack-bottom">
              <span>8</span>
              <Resource name="plant" />
            </div>
            <div className="resources middle text-right p-rel">
              <span className="sub small">OR</span>
              <MegaCredit value="23" />
            </div>
          </div>
          <div className="cell middle">
            <div className="resources middle">
              <span className="arrow" />
            </div>
          </div>
          <div className="cell middle">
            <div className="flex">
              <div className="resources middle text-center col-1">
                <Tile name="greenery" />
              </div>
              <button className="standard-project middle">Greenery</button>
            </div>
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
};

export default StandardProjects;
