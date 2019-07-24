import React, { Component } from 'react';
import './GlobalParameters.scss';
import { Tile, Param, Production, Resource } from '../assets/Assets';

/**
 * Shows the global parameters
 */
export default class GlobalParameters extends Component {
  render() {
    return (
      <div className="global-params">
        <div className="flex">
          <div className="col-1 oxy-wrapper flex">
            <Param name="oxygen" />
            <div
                className={`oxy-gauge bottom ${this.props.oxygen === 14 ? 'maxed' : ''}`}
                style={{height: `${(this.props.oxygen / (14 / 329) + 9)}px`}}>
              <span>{`${this.props.oxygen}%`}</span>
            </div>

            <div className={`bonus ${this.props.oxygen >= 8 ? 'met' : ''}`} style={{top: `${329 - (8 / (14 / 329))}px`}} data-content="8%">
              <Param name="temperature" />
            </div>
          </div>

          <div className="col-1 temp-wrapper flex">
            <Param name="temperature" />
            <div
                className={`temp-gauge bottom ${this.props.temperature === 8 ? 'maxed' : ''}`}
                style={{height: `${((this.props.temperature + 30) / (38 / 329) + 9)}px`}}>
              <span>{`${this.props.temperature > 0 ? '+' : ''}${this.props.temperature}°C`}</span>
            </div>

            <div className={`bonus ${this.props.temperature >= -24 ? 'met' : ''}`} style={{top: `${329 - (6 / (38 / 329))}px`}} data-content="-24">
              <Production>
                <div className="flex">
                  <Resource name="heat" />
                </div>
              </Production>
            </div>

            <div className={`bonus ${this.props.temperature >= -20 ? 'met' : ''}`} style={{top: `${329 - (10 / (38 / 329))}px`}} data-content="-20">
              <Production>
                <div className="flex">
                  <Resource name="heat" />
                </div>
              </Production>
            </div>

            <div className={`bonus ${this.props.temperature >= 0 ? 'met' : ''}`} style={{top: `${329 - (30 / (38 / 329))}px`}} data-content="0">
              <Tile name="ocean" />
            </div>
          </div>
        </div>

        <div className={`ocean-param ${this.props.ocean === 0 ? 'maxed' : ''}`}>
          <Tile name="ocean">
            <div className="ocean-num">
              {this.props.ocean}
            </div>
          </Tile>
        </div>
      </div>
    );
  }
}
