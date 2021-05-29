import React from 'react';
import PropTypes from 'prop-types';
import Tag from './Tag';
import classNames from 'classnames';
import { MegaCredit, Resource } from './Assets';
import Restriction from './Restriction';

/**
 * TR parameter
 *
 * @prop name Param type (e.g. temperature, oxygen, card)
 * @prop tag  Tag of parameter (typically only used for name='card')
 */
const Param = props => (
  <div
    className={classNames('param', props.name, { anyone: props.anyone })}
    style={props.style}
  >
    {props.megacredit ? <MegaCredit value={props.megacredit} /> : null}
    {props.tag ? <Tag name={props.tag} /> : null}
    {props.resource ? <Resource name={props.resource} /> : null}
    {props.requirement ? <Restriction /> : null}
    {props.name.includes('card') &&
    props.name.match(/active|event|automated|prelude/) ? (
      <>
        {!props.name.includes('prelude') ? <div className="mc" /> : null}
        <div className="tags" />
        <div className="project">
          <div className="header">
            {!props.name.includes('prelude') ? (
              <div className="restriction" />
            ) : null}
          </div>
          <div className="title"></div>
          {props.name.includes('active') ? (
            <div className="body top"></div>
          ) : null}
          <div className="image">
            {props.name.includes('active') ? '💡' : null}
            {props.name.includes('event') ? '🔥' : null}
            {props.name.includes('automated') ? '⚙' : null}
            {props.name.includes('prelude') ? '💰' : null}
          </div>
          <div className="separator"></div>
          <div className="body">
            <div className="flavor"></div>
          </div>
        </div>
      </>
    ) : null}
    {props.name.includes('corp') ? (
      <>
        <div className="tags" />
        <div className="corp-body">
          <div className="tag-shelf" />
          <div className="body">
            <div className="flex gutter">
              <div className="col-1">---</div>
              <div className="col-1 middle">
                <div className="effect">
                  <div
                    className="effect-title"
                    style={{
                      width: '95%',
                      height: '4em',
                      marginBottom: '4em'
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flavor"></div>
          </div>
        </div>
      </>
    ) : null}
  </div>
);

Param.propTypes = {
  name: PropTypes.string,
  tag: PropTypes.string,
  resource: PropTypes.string,
  megacredit: PropTypes.number,
  style: PropTypes.object,
  anyone: PropTypes.bool,
  requirement: PropTypes.bool
};

export default Param;
