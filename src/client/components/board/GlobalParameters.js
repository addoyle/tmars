import React, { Component } from 'react';
import './GlobalParameters.scss';
import { Tile, Param, Production, Resource } from '../assets/Assets';

/**
 * Shows the global parameters
 */
export default class GlobalParameters extends Component {
  render() {
    const gaugeHeight = 329;
    const gauge = (max, value, offset = 0, inv = false) => Math.abs((value * gaugeHeight / max) + offset - (inv ? gaugeHeight : 0));
    const tempMax = 38;
    const oxyMax = 14

    return (
      <div className="global-params">
        <div className="flex">
          <div className="col-1 oxy-wrapper flex">
            <Param name="oxygen" />
            <div
                className={`oxy-gauge bottom ${this.props.oxygen === oxyMax ? 'maxed' : ''}`}
                style={{height: `${gauge(oxyMax, this.props.oxygen, 9)}px`}}>
              <span>{`${this.props.oxygen}%`}</span>
            </div>

            <div className={`bonus ${this.props.oxygen >= 8 ? 'met' : ''}`} style={{top: `${gauge(oxyMax, 8, 0, true)}px`}} data-content="8%">
              <Param name="temperature" />
            </div>

            {new Array(oxyMax).fill(undefined).map((v,i) => (
              <span className="tick" style={{top: `${gauge(oxyMax, i, 0, true)}px`}} />
            ))}
          </div>

          <div className="col-1 temp-wrapper flex">
            <Param name="temperature" />
            <div
                className={`temp-gauge bottom ${this.props.temperature === 8 ? 'maxed' : ''}`}
                style={{height: `${gauge(tempMax, this.props.temperature + 30, 9)}px`}}>
              <span>{`${this.props.temperature > 0 ? '+' : ''}${this.props.temperature}°C`}</span>
            </div>

            <div className={`bonus ${this.props.temperature >= -24 ? 'met' : ''}`} style={{top: `${gauge(tempMax, -24 + 30, 0, true)}px`}} data-content="-24">
              <Production>
                <div className="flex">
                  <Resource name="heat" />
                </div>
              </Production>
            </div>

            <div className={`bonus ${this.props.temperature >= -20 ? 'met' : ''}`} style={{top: `${gauge(tempMax, -20 + 30, 0, true)}px`}} data-content="-20">
              <Production>
                <div className="flex">
                  <Resource name="heat" />
                </div>
              </Production>
            </div>

            <div className={`bonus ${this.props.temperature >= 0 ? 'met' : ''}`} style={{top: `${gauge(tempMax, 0 + 30, 0, true)}px`}} data-content="0°C">
              <Tile name="ocean" />
            </div>

            {new Array(tempMax / 2).fill(undefined).map((v,i) => (
              <span className="tick" style={{top: `${gauge(tempMax, i * 2, 0, true)}px`}} />
            ))}
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
