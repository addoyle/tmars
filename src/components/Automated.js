import React from 'react';
import './Automated.scss';
import Project from './Project';
import Art from './Art';
import Separator from './Separator';

export default class Automated extends Project {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Project {...this.props} type="automated">
        <Art art={this.props.emoji} />
        <Separator number={this.props.number} />
        <div className="body">
          {this.props.layout}
          <div className="flavor">{this.props.flavor}</div>
        </div>
      </Project>
    );
  }
}
