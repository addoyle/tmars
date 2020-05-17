import React from 'react';
import PropTypes from 'prop-types';
import './Gauge.scss';
import { Param, Tile, Resource, Production } from '../../assets/Assets';
import classNames from 'classnames';

const gaugeHeight = 269;

const Gauge = props => {
  const calc = (value, offset = 0, inv) => {
    return Math.abs(
      ((value - props.min) * gaugeHeight) / (props.max - props.min) +
        offset -
        (inv ? gaugeHeight : 0)
    );
  };

  return (
    <div
      className={classNames(
        'col-1',
        'gauge-wrapper',
        `${props.name}-wrapper`,
        'flex',
        {
          maxed: props.value === props.max
        }
      )}
    >
      {props.icon}
      <div
        className={`gauge ${props.name}-gauge bottom`}
        style={{ height: `${calc(props.value, 9)}px` }}
      >
        <span>{props.renderValue(props.value)}</span>
      </div>

      {props.bonuses.map((bonus, i) => (
        <div
          key={i}
          className={classNames('bonus', {
            met: props.value >= bonus.threshold,
            'bonus-production': bonus.production
          })}
          style={{
            top: `${calc(bonus.threshold, 0, true)}px`
          }}
          data-content={bonus.content || props.renderValue(bonus.threshold)}
        >
          {bonus.production ? (
            <Production>
              <div className="flex">
                <Resource name={bonus.production} />
              </div>
            </Production>
          ) : bonus.tile ? (
            <Tile name={bonus.tile} />
          ) : bonus.param ? (
            <Param name={bonus.param} />
          ) : bonus.resource ? (
            <Resource name={bonus.resource} />
          ) : null}
        </div>
      ))}

      {new Array((props.max - props.min) / props.step)
        .fill(undefined)
        .map((v, i) => (
          <span
            key={i}
            className="tick"
            style={{ top: `${calc((i + 1) * props.step + props.min)}px` }}
          />
        ))}
    </div>
  );
};

Gauge.defaultProps = {
  min: 0,
  step: 1,
  renderValue: val => val
};

Gauge.propTypes = {
  value: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  bonuses: PropTypes.arrayOf(
    PropTypes.shape({
      threshold: PropTypes.number.isRequired,
      content: PropTypes.string,
      production: PropTypes.string,
      tile: PropTypes.string,
      param: PropTypes.string
    })
  ),
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  renderValue: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired
};

export default Gauge;
