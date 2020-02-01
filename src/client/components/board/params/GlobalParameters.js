import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './GlobalParameters.scss';
import classNames from 'classnames';
import Ocean from './Ocean';
import Oxygen from './Oxygen';
import Temperature from './Temperature';

/**
 * Shows the global parameters
 */
@inject('boardStore')
@observer
export default class GlobalParameters extends Component {
  render() {

    return (
      <div className="global-params">
        <div className={classNames('points', { o : this.props.boardStore.params.generation % 5 !== 0 })}>
          <span className="value">{this.props.boardStore.params.generation}</span>
        </div>

        <div className="flex">
          <Oxygen max={14} />
          <Temperature max={38} />
        </div>

        <Ocean />
      </div>
    );
  }
}
