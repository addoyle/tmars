import React, { Component } from 'react';
import Tag from './assets/Tag';
import Resource from './assets/Resource';
import VictoryPoint from './assets/VictoryPoint';
import MegaCredit from './assets/MegaCredit';
import Requirement from './assets/Requirement';
import './Project.scss';

export default class Project extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const binaryNum = (+this.props.number).toString(2);

    return (
      <div className="project">
        <MegaCredit>{this.props.cost}</MegaCredit>
        <div className="tags">{this.props.tags.map(tag => ( <Tag key={tag} name={tag} /> ))}</div>
        <div className={`project-body ${this.props.type}`}>
          <div className="header">
            <Requirement values={this.props.requirements ? this.props.requirements.values : []} max={this.props.requirements && this.props.requirements.max} />
          </div>
          <div className="title">{this.props.title}</div>
          <div className="image">&#x1F4A9;</div>
          <div className="separator">{'0'.repeat(8 - binaryNum.length) + binaryNum}</div>
          <div className="desc">
            <div className="number">{'0'.repeat(3 - this.props.number.length) + this.props.number}</div>
            {this.props.children}
            <div className="flavor">{this.props.flavor}</div>
          </div>
          {this.props.expac && this.props.expac !== 'base' ? (
            <div className={`expac ${this.props.expac}`} />
          ) : ''}
        </div>
      </div>
    );
  }
}
