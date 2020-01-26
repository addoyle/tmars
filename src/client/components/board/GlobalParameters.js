import React, { Component } from 'react';
import './GlobalParameters.scss';
import { Tile, Param, Production, Resource } from '../assets/Assets';
import classNames from 'classnames';

/**
 * Shows the global parameters
 */
export default class GlobalParameters extends Component {
  render() {
    const gaugeHeight = 269;
    const gauge = (max, value, offset = 0, inv = false) => Math.abs((value * gaugeHeight / max) + offset - (inv ? gaugeHeight : 0));
    const tempMax = 38;
    const oxyMax = 14

    return (
      <div className="global-params">
        <div className={classNames('points', { o : this.props.generation % 5 !== 0 })}>
          <span className="value">{this.props.generation}</span>
        </div>

        <div className="flex">
          <div className={classNames('col-1', 'oxy-wrapper', 'flex', { maxed: this.props.oxygen === oxyMax })}>
            <Param name="oxygen" />
            <div className="oxy-gauge bottom" style={{height: `${gauge(oxyMax, this.props.oxygen, 9)}px`}}>
              <span>{`${this.props.oxygen}%`}</span>
            </div>

            <div className={classNames('bonus', { met: this.props.oxygen >= 8 })} style={{top: `${gauge(oxyMax, 8, 0, true)}px`}} data-content="8%">
              <Param name="temperature" />
            </div>

            {new Array(oxyMax).fill(undefined).map((v,i) => (
              <span key={i} className="tick" style={{top: `${gauge(oxyMax, i, 0, true)}px`}} />
            ))}
          </div>

          <div className={classNames('col-1', 'temp-wrapper', 'flex', { maxed: this.props.temperature === 8 })}>
            <Param name="temperature" />
            <div className="temp-gauge bottom" style={{height: `${gauge(tempMax, this.props.temperature + 30, 9)}px`}}>
              <span>{`${this.props.temperature > 0 ? '+' : ''}${this.props.temperature}°C`}</span>
            </div>

            <div className={classNames('bonus', 'heat', { met: this.props.temperature >= -24 })} style={{top: `${gauge(tempMax, -24 + 30, 0, true)}px`}} data-content="-24">
              <Production>
                <div className="flex">
                  <Resource name="heat" />
                </div>
              </Production>
            </div>

            <div className={classNames('bonus', 'heat', { met: this.props.temperature >= -20 })} style={{top: `${gauge(tempMax, -20 + 30, 0, true)}px`}} data-content="-20">
              <Production>
                <div className="flex">
                  <Resource name="heat" />
                </div>
              </Production>
            </div>

            <div className={classNames('bonus', { met: this.props.temperature >= 0 })} style={{top: `${gauge(tempMax, 0 + 30, 0, true)}px`}} data-content="0°C">
              <Tile name="ocean" />
            </div>

            {new Array(tempMax / 2).fill(undefined).map((v,i) => (
              <span key={i} className="tick" style={{top: `${gauge(tempMax, i * 2, 0, true)}px`}} />
            ))}
          </div>
        </div>

        <div className={classNames('ocean-param', { maxed: this.props.ocean === 0 })}>
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
