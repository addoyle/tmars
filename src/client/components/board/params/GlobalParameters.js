import React, { Component } from 'react';
import './GlobalParameters.scss';
import classNames from 'classnames';
import Ocean from './Ocean';
import Oxygen from './Oxygen';
import Temperature from './Temperature';

/**
 * Shows the global parameters
 */
export default class GlobalParameters extends Component {
  render() {
    const tempMax = 38;
    const oxyMax = 14

    return (
      <div className="global-params">
        <div className={classNames('points', { o : this.props.generation % 5 !== 0 })}>
          <span className="value">{this.props.generation}</span>
        </div>

        <div className="flex">
          <Oxygen value={this.props.oxygen} max={oxyMax} />
          <Temperature value={this.props.temperature} max={tempMax} />
        </div>

        <Ocean value={this.props.ocean} />
      </div>
    );
  }
}
