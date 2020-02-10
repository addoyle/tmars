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
      {props.name.indexOf('card') >= 0 && props.name.match(/active|event|automated|prelude/) ? <>
        {props.name.indexOf('prelude') === -1 ? <div className="mc" /> : null}
        <div className="tags" />
        <div className="project">
          <div className="header">
            {props.name.indexOf('prelude') === -1 ? <div className="restriction" /> : null}
          </div>
          <div className="title"></div>
          {props.name.indexOf('active') >= 0 ? <div className="body top"></div> : null }
          <div className="image">
            {props.name.indexOf('active') >= 0 ? '💡' : null}
            {props.name.indexOf('event') >= 0 ? '🔥' : null}
            {props.name.indexOf('automated') >= 0 ? '⚙' : null}
            {props.name.indexOf('prelude') >= 0 ? '💰' : null}
          </div>
          <div className="separator">
          </div>
          <div className="body">
            <div className="flavor"></div>
          </div>
        </div>
      </> : null}
      {props.name.indexOf('corp') >= 0 ? <>
        <div className="tags" />
        <div className="corp-body">
          <div className="tag-shelf" />
          <div className="body">
            <div className="flex gutter">
              <div className="col-1">---</div>
              <div className="col-1 middle">
                <div className="effect">
                  <div className="effect-title" style={{
                    width: '95%',
                    height: '4em',
                    marginBottom: '4em'
                  }} />
                </div>
              </div>
            </div>
            <div className="flavor"></div>
          </div>
        </div>
      </> : null}
    </div>
  );
}
