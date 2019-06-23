import React, { Component } from 'react';
import './Board.scss';
import Field from './Field';

export default class Board extends Component {
  render() {
    return (
      <div className="board">
        <Field />
      </div>
    );
  }
}
