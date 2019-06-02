import React from 'react';
import './Project.scss';
import Card from './Card';
import Tag from './assets/Tag';
import MegaCredit from './assets/MegaCredit';
import Restriction from './assets/Restriction';

export default class Project extends Card {
  number;
  cost;
  restriction;
  vp;
  emoji;

  render() {
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
        const prepareItem = (key) => {
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
          prepareItem('tag');
        }
        if (res.resource) {
          prepareItem('resource');
        }
        if (res.tile) {
          prepareItem('tile');
        }
        if (res.production) {
          prepareItem('production');
        }
      }
    }

    return (
      <Card type={this.props.type}>
        <MegaCredit value={this.props.cost} />
        <div className="tags">{this.props.tags.map(tag => ( <Tag key={tag} name={tag} /> ))}</div>
        <div className="project">
          <div className="header">
            <Restriction values={restriction} max={this.props.restriction && this.props.restriction.max} />
          </div>
          <div className="title">{this.props.title}</div>
          {this.props.children}
        </div>
      </Card>
    );
  }
}
