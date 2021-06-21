import React from 'react';
import PropTypes from 'prop-types';
import './CorporationLayout.scss';
import CardLayout from './CardLayout';
import { Resource, Tag } from '../assets/Assets';
import classNames from 'classnames';

/**
 * Corporation cards
 */
const CorporationLayout = props => (
  <CardLayout
    number={props.number}
    type="corp"
    set={props.set}
    todo={props.todo}
    showZoom={props.showZoom}
    landscape
  >
    <div className="tags">
      {props.tags.map((tag, i) => (
        <Tag key={i} name={tag} />
      ))}
    </div>
    <div className="corp-body">
      <div className="tag-shelf">
        {props.tags.map((tag, i) => (
          <div key={i} />
        ))}
      </div>
      <div
        style={props.titleStyle}
        className={classNames('title', props.titleClass)}
      >
        {props.title}
        {props.resource ? (
          <div className="resources image-resources">
            <span>{props.resource.value}</span>
            <Resource name={props.resource.type} />
          </div>
        ) : null}
      </div>
      <div className="body">{props.layout}</div>
      <div className="flavor bottom">{props.flavor}</div>
    </div>
  </CardLayout>
);

CorporationLayout.propTypes = {
  title: PropTypes.string.isRequired,
  titleStyle: PropTypes.object,
  titleClass: PropTypes.string,
  number: PropTypes.string.isRequired,
  set: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  layout: PropTypes.node.isRequired,
  flavor: PropTypes.string,
  resource: PropTypes.shape({
    value: PropTypes.number,
    type: PropTypes.string
  }),
  simple: PropTypes.bool,
  todo: PropTypes.bool,
  showZoom: PropTypes.bool
};

export default CorporationLayout;
