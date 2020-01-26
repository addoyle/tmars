import React from 'react';
import './Assets.scss';
import Tag from './Tag';
import classNames from 'classnames';

/**
 * TR parameter
 *
 * @prop name Param type (e.g. temperature, oxygen, card)
 * @prop tag  Tag of parameter (typically only used for name='card')
 */
export default function Param(props) {
  return (
    <div className={classNames('param', props.name)}>
      {props.tag ? (
        <Tag name={props.tag} />
      ) : ''}
      {props.name.indexOf('card') >= 0 && props.name.match(/active|event|automated/) ? <>
        <div className="mc" />
        <div className="tags" />
        <div className="project">
          <div className="header">
            <div className="restriction" />
          </div>
          <div className="title"></div>
          {props.name.indexOf('active') >= 0 ? <div className="body top"></div> : null }
          <div className="image">
            {props.name.indexOf('active') >= 0 ? '💡' : null}
            {props.name.indexOf('event') >= 0 ? '🔥' : null}
            {props.name.indexOf('automated') >= 0 ? '⚙' : null}
          </div>
          <div className="separator">
          </div>
          <div className="body">
            <div className="flavor"></div>
          </div>
        </div>
      </> : null}
    </div>
  );
}
