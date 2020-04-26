import React from 'react';
import PropTypes from 'prop-types';
import './CorporationLayout.scss';
import CardComponent from './CardLayout';
import { Tag } from '../assets/Assets';
import classNames from 'classnames';

/**
 * Corporation cards
 */
const CorporationLayout = props => (
  <CardComponent type="corp" set={props.set} landscape>
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
      </div>
      <div className="body">{props.layout}</div>
      <div className="flavor bottom">{props.flavor}</div>
    </div>
  </CardComponent>
);

CorporationLayout.propTypes = {
  title: PropTypes.string.isRequired,
  titleStyle: PropTypes.object,
  titleClass: PropTypes.string,
  set: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  layout: PropTypes.node.isRequired,
  flavor: PropTypes.string
};

export default CorporationLayout;
