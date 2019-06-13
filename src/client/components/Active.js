import React from 'react';
import './Active.scss';
import Project from './Project';
import Art from './assets/Art';
import Separator from './assets/Separator';

export default class Active extends Project {
  render() {
    return (
      <Project {...this.props} type="active">
        <div className="body top">
          {this.props.activeLayout}
        </div>
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
