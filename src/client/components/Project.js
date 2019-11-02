import React from 'react';
import './Project.scss';
import Card from './Card';
import Tag from './assets/Tag';
import MegaCredit from './assets/MegaCredit';
import Restriction from './assets/Restriction';
import { cloneDeep } from 'lodash';

/**
 * Project cards (Automated, Active, or Event)
 */
export default class Project extends Card {
  number;
  cost;
  restriction;
  vp;
  emoji;

  constructor(props) {
    super(props);

    Object.assign(this, props);
  }

  render() {
    const restriction = [];

    // Card has a restriction, convert it to a form that's easier to render
    if (this.props.restriction) {
      const res = cloneDeep(this.props.restriction);

      // Maximum restriction, append the word 'max'
      if (res.max) {
        restriction.push({text: 'max'});
      }

      // Restriction is a parameter, i.e. oxygen or temperature. Note: oceans are not included here, even though
      // they're considered parameters. They're handled by the Tiles section
      if (res.param) {

        // Oxygen, shown as N%
        if (res.param === 'oxygen') {
          restriction.push({text: res.value + '%'}, {param: 'oxygen'});
        }

        // Temperature, shown as ±N°C
        else if (res.param === 'temperature') {
          restriction.push({text: (res.value > 0 ? '+' : '') + res.value + '°C'}, {param: 'temperature'});
        }
      }

      // Anything else: tile, tag, production, etc.
      else {
        /**
         * Render a restriction
         *
         * @param key Restriction type (tag, resource, tile, production)
         */
        const prepareItem = (key) => {
          // More than 3, or max and more than 2, show with a number denoting the amount
          if (res.value > 3 || (res.max && res.value > 2)) {
            restriction.push({text: res.value});
            res.value = 1;
          }

          // No value specified, assumed to be 1
          if (!res.value) {
            res.value = 1;
          }

          // Convert to array if not already
          if (!Array.isArray(res[key])) {
            res[key] = [res[key]];
          }

          // Render the restrictions
          for (var i = 0; i < res.value; i++) {
            res[key].forEach(item => restriction.push({[key]: item, anyone: res.anyone}));
          }
        };

        // Render the restrictions
        res.tag && prepareItem('tag');
        res.resource && prepareItem('resource');
        res.tile && prepareItem('tile');
        res.production && prepareItem('production');
      }
    }

    return (
      <Card type={this.props.type} set={this.props.set}>
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
