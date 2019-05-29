import React, { Component } from 'react';
import Tag from './assets/Tag';
import MegaCredit from './assets/MegaCredit';
import Restriction from './assets/Restriction';
import './Project.scss';

export default class Project extends Component {
  render() {
    const binaryNum = (+this.props.number).toString(2);

    const restriction = [];
    if (this.props.restriction) {
      const res = this.props.restriction;
      if (res.max) {
        restriction.push({text: 'max'});
      }

      if (res.param) {
        if (res.param === 'oxygen') {
          restriction.push({text: res.value + '%'}, {param: 'oxygen'});
        } else if (res.param === 'temperature') {
          restriction.push({text: res.value + '°C'}, {param: 'temperature'});
        }
      } else {
        const render = (key) => {
          if (res.value > 3) {
            restriction.push({text: res.value});
            res.value = 1;
          }

          if (!res.value) {
            res.value = 1;
          }

          if (!Array.isArray(res[key])) {
            res[key] = [res[key]];
          }

          for (var i = 0; i < res.value; i++) {
            res[key].forEach(item => restriction.push({[key]: item}));
          }
        };

        if (res.tag) {
          render('tag');
        } else if (res.resource) {
          render('resource');
        } else if (res.tile) {
          render('tile');
        } else if (res.production) {
          render('production');
        }
      }
    }

    return (
      <div className="project">
        <MegaCredit value={this.props.cost} />
        <div className="tags">{this.props.tags.map(tag => ( <Tag key={tag} name={tag} /> ))}</div>
        <div className={`project-body ${this.props.type}`}>
          <div className="header">
            <Restriction values={restriction} max={this.props.restriction && this.props.restriction.max} />
          </div>
          <div className="title">{this.props.title}</div>
          {this.props.top ? (
            <div className="body top">{this.props.top}</div>
          ) : ''}
          <div className="image">{this.props.emoji}</div>
          <div className="separator">{'0'.repeat(8 - binaryNum.length) + binaryNum}</div>
          <div className="body">
            <div className="number">{'0'.repeat(3 - this.props.number.toString().length) + this.props.number}</div>
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
