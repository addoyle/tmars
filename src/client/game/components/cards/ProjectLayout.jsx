import React from 'react';
import PropTypes from 'prop-types';
import './ProjectLayout.scss';
import CardLayout from './CardLayout';
import { Tag, MegaCredit } from '../assets/Assets';
import Art from '../assets/Art';
import Separator from '../assets/Separator';
import Restriction from '../assets/Restriction';
// import { cloneDeep } from 'lodash';
import { displayRequirement } from '../../../util/util';

/**
 * Project cards (Automated, Active, or Event)
 */
const ProjectLayout = props => (
  <CardLayout {...props} landscape={props.type === 'prelude'}>
    <div className="project">
      <div className="header">
        {props.type !== 'prelude' ? (
          <Restriction
            values={props.restriction && displayRequirement(props.restriction)}
            max={props.restriction && props.restriction.max}
          />
        ) : null}
      </div>
      <div className="title">{props.title}</div>
      {props.type === 'active' ? (
        <div className="body top">{props.activeLayout}</div>
      ) : null}
      <Art art={props.emoji} resources={props.resource} />
      <Separator number={props.number} />
      <div className="body">
        {props.layout}
        <div className="flavor">{props.flavor}</div>
      </div>
    </div>
    {props.type !== 'prelude' ? <MegaCredit value={props.cost} /> : null}
    <div className="tags">
      {props.tags.map((tag, i) => (
        <Tag key={i} name={tag} />
      ))}
    </div>
  </CardLayout>
);

ProjectLayout.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  cost: PropTypes.number,
  restriction: PropTypes.shape({
    text: PropTypes.string,
    max: PropTypes.bool,
    param: PropTypes.string,
    tag: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    resource: PropTypes.string,
    tile: PropTypes.string,
    production: PropTypes.string,
    value: PropTypes.number
  }),
  type: PropTypes.string,
  set: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  tags: PropTypes.arrayOf(PropTypes.string),
  activeLayout: PropTypes.node,
  emoji: PropTypes.string,
  resource: PropTypes.shape({
    type: PropTypes.string,
    value: PropTypes.number
  }),
  layout: PropTypes.node.isRequired,
  flavor: PropTypes.string,
  todo: PropTypes.bool,
  modifiedCost: PropTypes.number,
  modifiedReqs: PropTypes.object,
  showZoom: PropTypes.bool
};

export default ProjectLayout;
