import React from 'react';
import PropTypes from 'prop-types';
import './ProjectLayout.scss';
import CardLayout from './CardLayout';
import { Tag, MegaCredit } from '../assets/Assets';
import Art from '../assets/Art';
import Separator from '../assets/Separator';
import Restriction from '../assets/Restriction';
import { cloneDeep } from 'lodash';

/**
 * Project cards (Automated, Active, or Event)
 */
const ProjectLayout = props => {
  const restriction = [];

  // Card has a restriction, convert it to a form that's easier to render
  if (props.restriction) {
    const res = cloneDeep(props.restriction);

    // Maximum restriction, append the word 'max'
    if (res.max) {
      restriction.push({ text: 'max' });
    }

    // Restriction is a parameter, i.e. oxygen or temperature. Note: oceans are not included here, even though
    // they're considered parameters. They're handled by the Tiles section
    if (res.param) {
      // Oxygen, shown as N%
      if (res.param === 'oxygen' || res.param === 'venus') {
        restriction.push({ text: res.value + '%' }, { param: res.param });
      }

      // Temperature, shown as ±N°C
      else if (res.param === 'temperature') {
        restriction.push(
          { text: (res.value > 0 ? '+' : '') + res.value + '°C' },
          { param: 'temperature' }
        );
      }
    }

    // Anything else: tile, tag, production, etc.
    else {
      /**
       * Render a restriction
       *
       * @param key Restriction type (tag, resource, tile, production)
       */
      const prepareItem = key => {
        // More than 3, or max and more than 2, show with a number denoting the amount
        if (res.value > 3 || (res.max && res.value > 2)) {
          restriction.push({ text: res.value });
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
          res[key].forEach(item =>
            restriction.push({ [key]: item, anyone: res.anyone })
          );
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
    <CardLayout
      type={props.type}
      set={props.set}
      landscape={props.type === 'prelude'}
    >
      {props.type !== 'prelude' ? <MegaCredit value={props.cost} /> : null}
      <div className="tags">
        {props.tags.map((tag, i) => (
          <Tag key={i} name={tag} />
        ))}
      </div>
      <div className="project">
        <div className="header">
          {props.type !== 'prelude' ? (
            <Restriction
              values={restriction}
              max={props.restriction && props.restriction.max}
            />
          ) : null}
        </div>
        <div className="title">{props.title}</div>
        {props.type === 'active' ? (
          <div className="body top">{props.activeLayout}</div>
        ) : null}
        <Art art={props.emoji} resources={props.resources} />
        <Separator number={props.number} />
        <div className="body">
          {props.layout}
          <div className="flavor">{props.flavor}</div>
        </div>
      </div>
    </CardLayout>
  );
};

ProjectLayout.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  cost: PropTypes.number,
  restriction: PropTypes.shape({
    max: PropTypes.bool,
    param: PropTypes.string,
    tag: PropTypes.string,
    resource: PropTypes.string,
    tile: PropTypes.string,
    production: PropTypes.string,
    value: PropTypes.number
  }),
  type: PropTypes.string,
  set: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  activeLayout: PropTypes.node,
  emoji: PropTypes.string,
  resources: PropTypes.shape({
    type: PropTypes.string,
    value: PropTypes.number
  }),
  layout: PropTypes.node.isRequired,
  flavor: PropTypes.string
};

export default ProjectLayout;
